import { add, endOfDay } from "date-fns";
import { arg, booleanArg, extendType, intArg, nonNull, stringArg ,list} from "nexus";
import { NexusGenAllTypes } from "../../typegen";
import { errors, throwError } from "../../utils/error";
import { getPurchaseInfo2 } from "../user";

export const mutation_purchase = extendType({
    type: "Mutation",
    definition(t) {
        t.field("purchasePlanByUser", {
            type: nonNull("Int"),
            args: {
                planInfoId: nonNull(intArg()),
                merchantUid: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const plan = await ctx.prisma.planInfo.findUnique({ where: { id: args.planInfoId } });
                    if (!plan) return throwError(errors.noSuchData, ctx);
                    if (!plan.isActive) return throwError(errors.etc("구매할 수 없는 상품입니다."), ctx);
                    const { description, isActive, ...etcPlanData } = plan;
                    const existingInfo = await getPurchaseInfo2(ctx.prisma, ctx.token!.userId!);
                    if (plan.planLevel) {
                        // if (existingInfo.level === plan.planLevel) return throwError(errors.etc("이미 해당 상품을 이용중입니다."), ctx);
                        // else if (existingInfo.level >= plan.planLevel) return throwError(errors.etc("하위 단계의 상품을 주문할 수 없습니다. 고객센터로 문의해주세요."), ctx);
                    }
                    if (plan.externalFeatureVariableId) {
                        if (existingInfo.additionalInfo.find(v => v.type === plan.externalFeatureVariableId)) return throwError(errors.etc("이미 해당 상품을 이용중입니다."), ctx);
                    }
                    await ctx.prisma.purchaseLog.create({
                        data: {
                            type: plan.planLevel !== null ? "PLAN" : plan.externalFeatureVariableId as NexusGenAllTypes["PurchaseLogType"], //TODO: 나중에 애드온나오면 뒷부분 수정
                            planInfo: JSON.stringify(etcPlanData),
                            payAmount: plan.price,
                            state: "WAIT_PAYMENT",
                            payId: args.merchantUid,
                            userId: ctx.token!.userId!,
                            expiredAt: new Date(0),
                            purchasedAt: new Date(0),
                        }
                    })
                    return 0;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("cancelPurchasePlanByUser", {
            type: nonNull("Boolean"),
            args: {
                merchantUid: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const log = await ctx.prisma.purchaseLog.findUnique({ where: { payId: args.merchantUid } });
                    if (!log) return throwError(errors.etc("해당 결제건이 없습니다."), ctx);
                    await ctx.prisma.purchaseLog.delete({ where: { id: log.id } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updatePlanInfoByAdmin", {
            type: nonNull("PlanInfo"),
            args: {
                planId: nonNull(intArg()),
                name: stringArg(),
                description: stringArg(),
                price: intArg(),
                isActive: booleanArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const plan : any= await ctx.prisma.planInfo.findUnique({ where: { id: args.planId } });
                    if (!plan) return throwError(errors.noSuchData, ctx);
                    if (args.name && args.name.length > 50) return throwError(errors.etc("이름은 50자 이내로 입력해주세요."), ctx);
                    if (args.price && args.price < 0) return throwError(errors.etc("올바른 금액을 입력하세요."), ctx);
                    return await ctx.prisma.planInfo.update({
                        where: { id: plan.id },
                        data: {
                            name: args.name ?? undefined,
                            price: args.price ?? undefined,
                            description: args.description ?? undefined,
                            isActive: args.isActive ?? undefined,
                        }
                    });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("setPurchaseInfoByAdmin", {
            type: nonNull("Boolean"),
            args: {
                userId: nonNull(intArg()),
                planInfoId: nonNull(intArg()),
                expiredAt: arg({ type: "DateTime" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const plan = await ctx.prisma.planInfo.findUnique({ where: { id: args.planInfoId } });
                    if (!plan) return throwError(errors.noSuchData, ctx);
                    if (!plan.isActive) return throwError(errors.etc("구매할 수 없는 등급입니다."), ctx);
                    const { description, isActive, ...etcPlanData } = plan;
                    const existingInfo = await getPurchaseInfo2(ctx.prisma, args.userId);
                    const user :any = await ctx.prisma.user.findUnique({ where: { id: args.userId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    const userEmail :any= user.email;
                    if (user.state !== 'ACTIVE') return throwError(errors.etc(userEmail + " 유저는 활성화 상태가 아닙니다."), ctx);
                    let expiredAt = args.expiredAt;
                    if(!expiredAt) return throwError(errors.etc("기간이 전달되지 않았습니다."),ctx);
                    if (expiredAt) {
                        expiredAt = endOfDay(expiredAt);
                    }
                    if (plan.planLevel) {
                        //if (existingInfo.level === plan.planLevel) return throwError(errors.etc(userEmail + ": 님이 해당 상품을 이용중입다."), ctx);
                        // if (existingInfo.level > plan.planLevel) return throwError(errors.etc(userEmail + ": 하위 단계의 상품을 주문할 수 없습니다. 먼저 기존 주문의 무효화 처리를 해주세요."), ctx);
                            if(existingInfo.level === plan.planLevel && existingInfo.levelExpiredAt > expiredAt  ){
                            const test = await ctx.prisma.purchaseLog.updateMany({
                                where : { userId : args.userId , expiredAt : existingInfo.levelExpiredAt},
                                data : { expiredAt : expiredAt }
                            })
                            if(!test) return throwError(errors.etc("업데이트 실패"),ctx);


                            return true;
                        }
                    }
                    if (plan.externalFeatureVariableId) {
                        if (existingInfo.additionalInfo.find(v => v.type === plan.externalFeatureVariableId)) return throwError(errors.etc(userEmail + ": 이미 해당 상품을 이용중입니다."), ctx);
                    }
                    await ctx.prisma.purchaseLog.create({
                        data: {
                            type: plan.planLevel !== null ? "PLAN" : plan.externalFeatureVariableId as NexusGenAllTypes["PurchaseLogType"],
                            planInfo: JSON.stringify(etcPlanData),
                            payAmount: plan.price,
                            state: "ACTIVE",
                            payId: null,
                            userId: args.userId,
                            expiredAt: expiredAt ?? add(new Date(), { months: etcPlanData.month }),
                            purchasedAt: new Date(),
                        }
                    })
                    if(user.refAvailable === true && user.refCode !== "" && user.refCode !== null && user.master === 1){
                        switch(user.refCode){
                            case "1%": break;
                            case "1%수강" : break;
                            case "dream" : break;
                            case "타오랜드" : break;
                            case "taoland" : break;
                            case "돈벌삶" : break;
                            default : {
                                await ctx.prisma.user.update({
                                    where : { email : user.refCode},
                                    data : { credit : { increment : 10000 }}
                                })
                                await ctx.prisma.user.update({
                                    where : { id : user.id},
                                    data : { refAvailable : false }
                                })
                                break;
                            }
                        }
                    }
                    await ctx.prisma.user.update({
                        where : {
                            id: user.id
                        },
                        data : {
                            createdToken : null
                        }
                    })
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("extendMyAccountByUser",{
            type: nonNull("Boolean"),
            args: {
                masterId : nonNull(intArg()),
                slaveIds : nonNull(list(nonNull(intArg())))
            },
            resolve: async (src,args,ctx,info) => {
                try{
                    args.slaveIds.map(async (v :any)=>{
                        await ctx.prisma.user.update({
                            where : {
                                id : v
                            },
                            data : {
                                master : 0,
                                masterUserId : args.masterId
                            }
                        })
                    })
                       return true;
                }catch(e){
                    return throwError(e, ctx);
                }
            }
        })
        t.field("setMultiPurchaseInfoByAdmin", {
            type: nonNull("Boolean"),
            args: {
                purchaseInputs : nonNull(list(nonNull(arg({type : "purchaseInputs"})))),
                credit : nonNull(intArg())
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.update({
                        where : { id : ctx.token?.userId },
                        data : { credit : { decrement : args.credit }}
                    })
                    if(!user) return throwError(errors.etc("not exist user"),ctx);
                    if(user.refAvailable === true && user.refCode !== "" && user.refCode !== null && user.master === 1 ){
                        switch(user.refCode){
                            case "1%": break;
                            case "1%수강" :break;
                            case "dream" : break;
                            case "타오랜드" : break;
                            case "taoland" : break;
                            case "돈벌삶" : break;
                            default : {
                                await ctx.prisma.user.update({
                                    where : { email : user.refCode},
                                    data : { credit : { increment : 10000 }}
                                })
                                await ctx.prisma.user.update({
                                    where : { id : user.id},
                                    data : { refAvailable : false }
                                })
                                break;
                            }
                        }
                    }
                    const add = await ctx.prisma.purchaseLog.createMany({
                        data : args.purchaseInputs.map((v:any)=>{
                            return {
                            id : undefined,
                            planInfo: v.planInfoId === 2  ?`{"id":2,"planLevel":2,"name":"2단계","month":1,"price":99000,"externalFeatureVariableId":null}` : v.planInfoId === 3 ?
                            `{"id":3,"planLevel":3,"name":"3단계","month":1,"price":132000,"externalFeatureVariableId":null}` : v.planInfoId === 4 ? 
                            `{"id":4,"planLevel":4,"name":"4단계","month":1,"price":149000,"externalFeatureVariableId":null}` : `{"id":2,"planLevel":2,"name":"2단계","month":1,"price":99000,"externalFeatureVariableId":null}` ,
                            payAmount: v.planInfoId === 2 ? 99000 :  v.planInfoId === 3 ? 132000 : v.planInfoId === 4 ? 149000 : 99000,
                            state: "ACTIVE",
                            payId: null,
                            type : "PLAN",
                            userId: v.userId,
                            expiredAt: v.expiredAt ,
                            purchasedAt: new Date(),
                            }
                        })
                    })
                    if(!add) return throwError(errors.etc("fail create"),ctx);

                    const free = args.purchaseInputs.map(async(v:any) => {
                        await ctx.prisma.userInfo.update({
                            where : {
                                userId : v.userId
                            },
                            data : {
                                maxProductLimit : null
                            }
                        })
                        await ctx.prisma.user.update({
                            where : {
                                id : v.userId
                            },
                            data : {
                                createdToken : null
                            }
                        })
                    })
                    if(!free) return throwError(errors.etc("fail update"),ctx);
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("setUserStopTest",{
            type : nonNull("Boolean"),
            args: {
                userId : nonNull(intArg()),
            },
            resolve : async (src,args,ctx,info) => {
                try{
                    let data = new Date();
                    const user = await ctx.prisma.user.findUnique({ where: { id: args.userId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);

                    const purchaseLog = await ctx.prisma.purchaseLog.updateMany({
                        where : { userId : args.userId },
                        data : { expiredAt : data }
                    })

                    if(!purchaseLog) return throwError(errors.etc("Sorry, Fail to Stop User"),ctx);

                    return true;
                }catch(e){
                    return throwError(e, ctx);
                }
            }
        })
        t.field("invalidatePurchaseInfoByAdmin", {
            type: nonNull("Boolean"),
            args: {
                purchaseLogId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const plan = await ctx.prisma.purchaseLog.findUnique({ where: { id: args.purchaseLogId } });
                    if (!plan) return throwError(errors.noSuchData, ctx);
                    await ctx.prisma.purchaseLog.update({
                        where: { id: args.purchaseLogId },
                        data: {
                            state: "ENDED",
                            expiredAt: new Date(),
                        }
                    })
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});