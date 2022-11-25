//user/mutation
import { hashSync, compareSync } from "bcryptjs";
import { isBefore } from "date-fns";
 import { getPurchaseInfo } from ".";
import { APP_REFRESH_SECRET, APP_SECRET, regexPattern } from "../../utils/constants";
 import { throwError, errors } from "../../utils/error";
 import { uploadToS3 } from "../../utils/file_manage";
 import { generateToken, generateUserToken, validateStringLength ,encrypt} from "../../utils/helpers";
import { verify } from 'jsonwebtoken';
import { arg, booleanArg, extendType, floatArg, intArg, nonNull, stringArg } from "nexus";
import { Token } from '../../types';
import fetch from "node-fetch";
import { getRandomVerificationNumber } from "../../utils/local/phone_verification";
import * as CryptoJS from "crypto-js";

type IheadersData ={
    "Content-Type" : string;
    "x-ncp-apigw-timestamp" : string ;
    "x-ncp-iam-access-key" : string ;
    "x-ncp-apigw-signature-v2" : string ;
}
export const mutation_user = extendType({
    type: "Mutation",
    definition(t) {
            t.field("findEmailCreateVerification",{
                type : nonNull("String"),
                args: {
                    phoneNumber: nonNull(stringArg()),
                },
                resolve : async(src,args,ctx,info) => {
                    try{
                        if (!regexPattern.phone.test(args.phoneNumber)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."),ctx);
                            const phone = args.phoneNumber.replace(regexPattern.phone, "0$1$2$3");
                            const userInfo = await ctx.prisma.userInfo.findMany({where : { phone }});
                            if(!userInfo) return throwError(errors.etc("존재하지 않는 이용자입니다."),ctx); 

                            const verificationNumber  = getRandomVerificationNumber();//숫자를만들어냄 
                            console.log(`인증 번호 발송) ${phone} : ${verificationNumber}`);
                            
                            let verfifyData = {
                                "type":"SMS",
                                "contentType":"COMM",
                                "countryCode":"82",
                                "from":"07040647890",
                                "subject":"",
                                "content":`[셀포유] 인증번호 [${verificationNumber}]를 입력해주세요.`,
                                "messages":[
                                    {
                                        "to": phone,
                                    }
                                ],
                            };
                    
                            const now = new Date().getTime();
                            const path = `/sms/v2/services/ncp:sms:kr:259001473572:verification/messages`;
                            const accesskey = "xzd0g9r6eCQ8uS8033tu";
                            const secretkey = "Hb3DJDmA0WaxXqE8qUWm4a6dSf2vliE7dizN3nq1";
                            const base_str = `POST ${path}\n${now}\n${accesskey}`;
                            const signature = CryptoJS.HmacSHA256(base_str, secretkey).toString(CryptoJS.enc.Base64);
                            
                            let headersData : IheadersData = {
                                "Content-Type" : "application/json; charset=utf-8",
                
                                "x-ncp-apigw-timestamp" : now.toString(),
                                "x-ncp-iam-access-key" : accesskey,
                                "x-ncp-apigw-signature-v2" : signature
                            }

                            await fetch(`https://sens.apigw.ntruss.com${path}`, {
                                headers: headersData,
                                method: "POST",
                                body: JSON.stringify(verfifyData)
                            });
                            await Promise.all(userInfo.map(async v =>{
                                await ctx.prisma.user.update({ where : { id : v.userId }, data: { verificationNumber } });
                            }))
                            

                        return "인증번호가 발급되었습니다."
                        }catch(e){
                            throwError(e,ctx);
                        }
                }
                })
                t.field("findEmail",{
                    type : nonNull("String"),
                    args: {
                        phone : nonNull(stringArg()),
                        verificationNumber: nonNull(stringArg()),
                    },resolve : async(src,args,ctx,info) => {
                        try{
                            if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."),ctx);
                            const phone = args.phone.replace(regexPattern.phone, "0$1$2$3");
                            const userInfo = await ctx.prisma.userInfo.findMany({where : { phone }, include : {user : true}});
                            if(!userInfo) return throwError(errors.etc("존재하지 않는 이용자입니다."),ctx); 
                            const userList :any = userInfo.filter(v => v.user.verificationNumber === args.verificationNumber);
                            
                            return JSON.stringify(userList);
                        }catch(e){
                            throwError(e,ctx);
                        }
                    }
                })
            t.field("EditPassword",{
                type : nonNull("String"),
                args: {
                    email : nonNull(stringArg()),
                    verificationNumber: nonNull(stringArg()),
                    newPassword : nonNull(stringArg()),
                    checkNewPassword : nonNull(stringArg())
                },
                resolve : async(src,args,ctx,info) => {
                    try{
                        if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                        const user = await ctx.prisma.user.findFirst({ where : {email : args.email , verificationNumber : args.verificationNumber} });
                        if (!user) return throwError(errors.etc("존재하지 않는 아이디거나 인증번호가 일치하지 않습니다."),ctx);
                        if (user.state !== 'ACTIVE') return throwError(errors.etc("비활성된 아이디입니다."),ctx);
                        if (args.newPassword !== args.checkNewPassword) return throwError(errors.etc("신규 비밀번호가 일치하지 않습니다."),ctx);

                        await ctx.prisma.user.update({
                            where: { id : user.id},
                            data : {
                                password : hashSync(args.newPassword)
                            }
                        })
                        return "비밀번호 변경 완료"
                        }catch(e){
                            throwError(e,ctx);
                        }
                }
            })
            t.field("EditPasswordCreateVerification",{
            type : nonNull("String"),
            args: {
                email : nonNull(stringArg()),
                phoneNumber: nonNull(stringArg()),
            },
            resolve : async(src,args,ctx,info) => {
                try{
                    if (!regexPattern.phone.test(args.phoneNumber)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."),ctx);
                        const tel = args.phoneNumber.replace(regexPattern.phone, "0$1$2$3");
                        const userData = await ctx.prisma.user.findUnique({ where : {email : args.email}, include : { userInfo : true}});
                        if(!userData) return throwError(errors.etc("존재하지 않는 이용자입니다."),ctx); 
                        if(!userData.userInfo) return throwError(errors.etc("정상적인 이용자가 아닙니다."),ctx);
                        if(userData.userInfo.phone !== args.phoneNumber) return throwError(errors.etc("전화번호가 일치하지 않습니다."),ctx); 
                        const verificationNumber  = getRandomVerificationNumber();//숫자를만들어냄 
                        console.log(`인증 번호 발송) ${tel} : ${verificationNumber}`);
                        
                        let verfifyData = {
                            "type":"SMS",
                            "contentType":"COMM",
                            "countryCode":"82",
                            "from":"07040647890",
                            "subject":"",
                            "content":`[셀포유] 인증번호 [${verificationNumber}]를 입력해주세요.`,
                            "messages":[
                                {
                                    "to": tel,
                                }
                            ],
                        };
                
                        const now = new Date().getTime();
                        const path = `/sms/v2/services/ncp:sms:kr:259001473572:verification/messages`;
                        const accesskey = "xzd0g9r6eCQ8uS8033tu";
                        const secretkey = "Hb3DJDmA0WaxXqE8qUWm4a6dSf2vliE7dizN3nq1";
                        const base_str = `POST ${path}\n${now}\n${accesskey}`;
                        const signature = CryptoJS.HmacSHA256(base_str, secretkey).toString(CryptoJS.enc.Base64);
                        
                        let headersData : IheadersData = {
                            "Content-Type" : "application/json; charset=utf-8",
            
                            "x-ncp-apigw-timestamp" : now.toString(),
                            "x-ncp-iam-access-key" : accesskey,
                            "x-ncp-apigw-signature-v2" : signature
                        }

                        await fetch(`https://sens.apigw.ntruss.com${path}`, {
                            headers: headersData,
                            method: "POST",
                            body: JSON.stringify(verfifyData)
                        });

                            await ctx.prisma.user.update({ where : { id : userData.id}, data: { verificationNumber } });
                        

                    return "인증번호가 발급되었습니다."
                    }catch(e){
                        throwError(e,ctx);
                    }
            }
        })
        t.field("signUpUserByEveryone", {//수성완료  회원가입 
            //type: nonNull("SignInType"),
            type: nonNull("String"),
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                phone: nonNull(stringArg()),
                verificationId: nonNull(intArg({ default: 0 })),//이제안씀 
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                    if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                    if (await ctx.prisma.user.findUnique({ where: { email: args.email } })) return throwError(errors.etc("해당 이메일이 이미 존재합니다."), ctx);
                    const tel = args.phone.replace(regexPattern.phone, "0$1$2$3");
                    if (args.verificationId !== 0) {
                        const verification = await ctx.prisma.phoneVerification.findUnique({ where: { id: args.verificationId } });
                        if (!verification) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                        if (verification.tel !== tel) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                        await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });
                    }

                    const updatesuccess = await ctx.prisma.phoneVerification.updateMany({
                        where : {
                            tel : args.phone , 
                            // verificationNumber : verification.verificationNumber
                        },
                        data : {
                            used : 0
                        }
                    })
                    if(!updatesuccess) return throwError(errors.etc("인증 실패 하였습니다."), ctx);

                    const user = await ctx.prisma.user.create({
                        data: {
                            email: args.email,
                            password: hashSync(args.password),
                            state: "ACTIVE",
                            verificationNumber : "",
                            userInfo: {//다른 model에 data 삽입도 이런식으로 가능 하네 ! 
                                create: {
                                    phone: tel,
                                    marginRate: 25,
                                    defaultShippingFee: 6000,
                                    cnyRate: 185.0,
                                    productCollectCount: 0,
                                    maxProductLimit: 100,
                                    additionalShippingFeeJeju: 5000,
                                    asTel: "000-000-0000",
                                    asInformation: "해외구매대행 상품은 국내에서 A/S가 불가능합니다.",
                                    refundShippingFee: 25000,
                                    exchangeShippingFee: 50000,
                                    naverOriginCode: "0200037",
                                    naverOrigin: "수입산",
                                    naverStoreUrl: "",
                                    naverStoreOnly: "N",
                                    naverFee: 0,
                                    coupangOutboundShippingTimeDay: 12,
                                    coupangUnionDeliveryType: "N",
                                    coupangMaximumBuyForPerson: 0,
                                    coupangLoginId: "",
                                    coupangVendorId: "",
                                    coupangAccessKey: "",
                                    coupangSecretKey: "",
                                    coupangImageOpt: "Y",
                                    coupangFee: 0,
                                    coupangDefaultOutbound: "",
                                    coupangDefaultInbound: "",
                                    streetApiKey: "",
                                    streetApiKey2: "",
                                    streetApiKey3: "",
                                    streetApiKey4: "",                                    
                                    streetFee: 0,
                                    streetNormalApiKey: "",
                                    streetNormalApiKey2: "",
                                    streetNormalApiKey3: "",
                                    streetNormalApiKey4: "",
                                    streetDefaultOutbound: "",
                                    streetDefaultInbound: "",
                                    streetNormalOutbound: "",
                                    streetNormalInbound: "",
                                    streetNormalFee: 0,
                                    interparkCertKey: "",
                                    interparkSecretKey: "",
                                    interparkFee: 0,
                                    esmplusMasterId: "",
                                    esmplusAuctionId: "",
                                    esmplusGmarketId: "",
                                    gmarketFee: 0,
                                    auctionFee: 0,
                                    lotteonVendorId: "",
                                    lotteonApiKey: "",
                                    lotteonFee: 0,
                                    lotteonNormalFee: 0,
                                    wemakepriceId: "",
                                    wemakepriceFee: 0,
                                    tmonId: "",
                                    tmonFee: 0,
                                    optionAlignTop: "Y",
                                    optionTwoWays: "Y",
                                    optionIndexType: 1,
                                    discountAmount: 0,
                                    discountUnitType: "WON",
                                    descriptionShowTitle: "Y",
                                    collectTimeout: 10,
                                    collectStock: 0,
                                    marginUnitType: "PERCENT",
                                    extraShippingFee: 0,
                                    streetUseType :"Y",
                                    streetUseKeyType:"1",
                                    streetNormalUseKeyType:"1",
                                    lotteonUseType :"Y",
                                    naverAutoSearchTag :"Y",
                                    naverUseType : "Y",
                                    coupangUseType : "Y",
                                    streetNormalUseType : "Y",
                                    gmarketUseType :"Y",
                                    auctionUseType :"Y",
                                    interparkUseType:"Y",
                                    wemakepriceUseType:"Y",
                                    lotteonNormalUseType:"Y",
                                    tmonUseType:"Y",
                                    lotteonSellerType : "G",
                                    interparkEditCertKey : "",
                                    interparkEditSecretKey : "",
                                    autoPrice : "Y",
                                    defaultPrice : "L",
                                    streetApiMemo : "",
                                    streetApiMemo2 : "",
                                    streetApiMemo3 : "",
                                    streetApiMemo4 : "",
                                    streetNormalApiMemo : "",
                                    streetNormalApiMemo2 : "",
                                    streetNormalApiMemo3 : "",
                                    streetNormalApiMemo4 : "",
                                    calculateWonType : "1000",
                                }
                            }
                        }
                    });

                    // const accessToken = await generateUserToken(ctx.prisma, user.id);
                    // const refreshToken = await generateToken(user.id, "userId", true); //추후 token 내부에 id받아오는거 없앨 예정 
                    // //refresh token 생성 후 삽입 
                    // const token = await ctx.prisma.user.update({
                    //     where : {
                    //         id : user.id,
                    //     },
                    //     data : {
                    //         token : refreshToken,
                    //         created_token : new Date(),
                    //     },
                    // })
                    // if(!token) return throwError(errors.etc("token 삽입에 실패하였습니다"),ctx)
                    
                    const plan = await ctx.prisma.planInfo.findUnique({ where: { id: 1 } });//기본 체험판 단계로 로그인 생성 
                    if (!plan) return throwError(errors.noSuchData, ctx);
                    const { description, isActive, ...etcPlanData } = plan;
                    await ctx.prisma.purchaseLog.create({
                        data: {
                            type: "PLAN",
                            planInfo: JSON.stringify(etcPlanData),
                            payAmount: plan.price,
                            state: "ACTIVE",
                            payId: null,
                            userId: user.id,
                            expiredAt: new Date('9999-12-31'),
                            purchasedAt: new Date(),
                        }
                    });
                    await ctx.prisma.user.update({
                        where : {id : user.id},
                        data:{
                            masterUserId : user.id
                        }
                    })
                    let success ="success";
                     return success;//front에서 token을 local에 저장은 해두어야하므로 .
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("signUpUserByEveryone2", {//수성완료  회원가입 
                    //type: nonNull("SignInType"),
                    type: nonNull("String"),
                    args: {
                        email: nonNull(stringArg()),
                        password: nonNull(stringArg()),
                        phone: nonNull(stringArg()),
                        verificationId: nonNull(intArg({ default: 0 })),//이제안씀 ,
                        refCode : stringArg()
                    },
                    resolve: async (src, args, ctx, info) => {
                        try {
                            if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                            if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                            if (await ctx.prisma.user.findUnique({ where: { email: args.email } })) return throwError(errors.etc("해당 이메일이 이미 존재합니다."), ctx);
                            const tel = args.phone.replace(regexPattern.phone, "0$1$2$3");
                            if (args.verificationId !== 0) {
                                const verification = await ctx.prisma.phoneVerification.findUnique({ where: { id: args.verificationId } });
                                if (!verification) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                                if (verification.tel !== tel) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                                await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });
                            }
        
                            const updatesuccess = await ctx.prisma.phoneVerification.updateMany({
                                where : {
                                    tel : args.phone , 
                                    // verificationNumber : verification.verificationNumber
                                },
                                data : {
                                    used : 0
                                }
                            })
                            if(!updatesuccess) return throwError(errors.etc("인증 실패 하였습니다."), ctx);
        
                            let refCodeId = 0;
                            if(args.refCode){
                            switch(args.refCode){
                                case "1%": break;
                                case "1%수강" :break;
                                case "dream" : break;
                                default : {
                                    let refCodeInfo = await ctx.prisma.user.findUnique({
                                        where : { email : args.refCode},
                                        select : { id : true}
                                    })
                                    if(!refCodeInfo) break;
                                    refCodeId = refCodeInfo.id;
                                    break;
                                }
                            }
                        }
        
                            const user = await ctx.prisma.user.create({
                                data: {
                                    email: args.email,
                                    password: hashSync(args.password),
                                    state: "ACTIVE",
                                    refCode : args.refCode ?? "",
                                    credit : args.refCode ? 5000 : 0,
                                    refAvailable : true,
                                    verificationNumber : "",
                                    userInfo: {//다른 model에 data 삽입도 이런식으로 가능 하네 ! 
                                        create: {
                                            phone: tel,
                                            marginRate: 25,
                                            defaultShippingFee: 6000,
                                            cnyRate: 185.0,
                                            productCollectCount: 0,
                                            maxProductLimit: 100,
                                            additionalShippingFeeJeju: 5000,
                                            asTel: "000-000-0000",
                                            asInformation: "해외구매대행 상품은 국내에서 A/S가 불가능합니다.",
                                            refundShippingFee: 25000,
                                            exchangeShippingFee: 50000,
                                            naverOriginCode: "0200037",
                                            naverOrigin: "수입산",
                                            naverStoreUrl: "",
                                            naverStoreOnly: "N",
                                            naverFee: 0,
                                            coupangOutboundShippingTimeDay: 12,
                                            coupangUnionDeliveryType: "N",
                                            coupangMaximumBuyForPerson: 0,
                                            coupangLoginId: "",
                                            coupangVendorId: "",
                                            coupangAccessKey: "",
                                            coupangSecretKey: "",
                                            coupangImageOpt: "Y",
                                            coupangFee: 0,
                                            coupangDefaultOutbound: "",
                                            coupangDefaultInbound: "",
                                            streetApiKey: "",
                                            streetApiKey2: "",
                                            streetApiKey3: "",
                                            streetApiKey4: "",                                    
                                            streetFee: 0,
                                            streetNormalApiKey: "",
                                            streetNormalApiKey2: "",
                                            streetNormalApiKey3: "",
                                            streetNormalApiKey4: "",
                                            streetDefaultOutbound: "",
                                            streetDefaultInbound: "",
                                            streetNormalOutbound: "",
                                            streetNormalInbound: "",
                                            streetNormalFee: 0,
                                            interparkCertKey: "",
                                            interparkSecretKey: "",
                                            interparkFee: 0,
                                            esmplusMasterId: "",
                                            esmplusAuctionId: "",
                                            esmplusGmarketId: "",
                                            gmarketFee: 0,
                                            auctionFee: 0,
                                            lotteonVendorId: "",
                                            lotteonApiKey: "",
                                            lotteonFee: 0,
                                            lotteonNormalFee: 0,
                                            wemakepriceId: "",
                                            wemakepriceFee: 0,
                                            tmonId: "",
                                            tmonFee: 0,
                                            optionAlignTop: "Y",
                                            optionTwoWays: "Y",
                                            optionIndexType: 1,
                                            discountAmount: 0,
                                            discountUnitType: "WON",
                                            descriptionShowTitle: "Y",
                                            collectTimeout: 10,
                                            collectStock: 0,
                                            marginUnitType: "PERCENT",
                                            extraShippingFee: 0,
                                            streetUseType :"Y",
                                            streetUseKeyType:"1",
                                            streetNormalUseKeyType:"1",
                                            lotteonUseType :"Y",
                                            naverAutoSearchTag :"Y",
                                            naverUseType : "Y",
                                            coupangUseType : "Y",
                                            streetNormalUseType : "Y",
                                            gmarketUseType :"Y",
                                            auctionUseType :"Y",
                                            interparkUseType:"Y",
                                            wemakepriceUseType:"Y",
                                            lotteonNormalUseType:"Y",
                                            tmonUseType:"Y",
                                            lotteonSellerType : "G",
                                            interparkEditCertKey : "",
                                            interparkEditSecretKey : "",
                                            autoPrice : "Y",
                                            defaultPrice : "L",
                                            streetApiMemo : "",
                                            streetApiMemo2 : "",
                                            streetApiMemo3 : "",
                                            streetApiMemo4 : "",
                                            streetNormalApiMemo : "",
                                            streetNormalApiMemo2 : "",
                                            streetNormalApiMemo3 : "",
                                            streetNormalApiMemo4 : "",
                                            calculateWonType : "1000",
                                        }
                                    }
                                }
                            });
        
                            // const accessToken = await generateUserToken(ctx.prisma, user.id);
                            // const refreshToken = await generateToken(user.id, "userId", true); //추후 token 내부에 id받아오는거 없앨 예정 
                            // //refresh token 생성 후 삽입 
                            // const token = await ctx.prisma.user.update({
                            //     where : {
                            //         id : user.id,
                            //     },
                            //     data : {
                            //         token : refreshToken,
                            //         created_token : new Date(),
                            //     },
                            // })
                            // if(!token) return throwError(errors.etc("token 삽입에 실패하였습니다"),ctx)
                            
                            const plan = await ctx.prisma.planInfo.findUnique({ where: { id: 1 } });//기본 체험판 단계로 로그인 생성 
                            if (!plan) return throwError(errors.noSuchData, ctx);
                            const { description, isActive, ...etcPlanData } = plan;
                            await ctx.prisma.purchaseLog.create({
                                data: {
                                    type: "PLAN",
                                    planInfo: JSON.stringify(etcPlanData),
                                    payAmount: plan.price,
                                    state: "ACTIVE",
                                    payId: null,
                                    userId: user.id,
                                    expiredAt: new Date('9999-12-31'),
                                    purchasedAt: new Date(),
                                }
                            });
                            await ctx.prisma.user.update({
                                where : {id : user.id},
                                data:{
                                    masterUserId : user.id
                                }
                            })
                            let success ="success";
                             return success;//front에서 token을 local에 저장은 해두어야하므로 .
                        } catch (e) {
                            return throwError(e, ctx);
                        }
                    }
                });
        t.field("cardPayTest",{
            type : nonNull("String"),
            args: {
                email: nonNull(stringArg()),
            },
            resolve : async (src,args,ctx,info) => {
                try{
                    const user :any= await ctx.prisma.user.findUnique({
                        where : { email : args.email }
                    })
                    if(!user) return throwError(errors.etc("해당 이메일을 가진 사용자가 존재하지 않습니다."),ctx);

                    const purchase_log :any= await ctx.prisma.purchaseLog.findMany({
                        where : { userId : user.id}
                    })
                    if(!purchase_log) return throwError(errors.etc("해당 id를 가진 사용자가 존재하지 않습니다."),ctx);
                    return JSON.stringify(purchase_log)

                }catch(e){
                    return throwError(e,ctx);
                }
            }
        })
        t.field("signOutUserByEveryone",{//수성 임시 작성 refreshToken logout시 제거  로그아웃 
            type: nonNull("String"),
            // args : {
            //     accessToken : nonNull(stringArg()),
            // },
            resolve : async (src, args, ctx , info ) => {
                try {

                   // const accessTokenInfo = verify(args.accessToken, APP_SECRET, {ignoreExpiration : true}) as Token;//인증결과는 decoded된 게 나옴 
                    let status = "";
                    //todoconsole.log("accessTokenInfo",ctx.token!.userId!);
                    try{
                        if(ctx.token!.userId!){ //return 값 userId or adminId 
                        const userInfo = await ctx.prisma.user.update({
                            where : {
                                id : ctx.token!.userId!,
                            },
                            data : {
                                token : null,
                                createdToken : null
                            }
                        })
                        if(!userInfo) {return throwError(errors.etc("로그아웃 실패"),ctx)}
                        else{status = "success";}
                    }
                    
                    // else if (accessTokenInfo.adminId)// admin 계정일 경우 
                    // {
                    //     const adminInfo = await ctx.prisma.admin.update({
                    //         where : {
                    //             id : accessTokenInfo.adminId,
                    //         },
                    //         data : {
                    //             token : null,
                    //             created_token : null
                    //         }
                    //     })
                    //     if(!adminInfo) {return throwError(errors.etc("로그아웃 실패"),ctx)}
                    //     else{status = "success";}
                    // }
                    }catch(e){
                        console.log(e);
                        return throwError(errors.etc("로그아웃 실패"),ctx);
                    }
                    return status ;
                
                }catch (error) {
                    return throwError(error,ctx);
                }
            }
        });
        t.field("signInUserByEveryone", {//todo 로그인
            type: nonNull("SignInType"),
            args: {
                userType: nonNull(arg({ type: "UserSocialType" })),
                email: nonNull(stringArg()),
                password: nonNull(stringArg({ description: "소셜의 경우 그냥 빈 문자열" })),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.userType === "EMAIL" && !regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                    const where = args.userType === "EMAIL" ? { email: args.email } : args.userType === "NAVER" ? { naverId: args.email } : args.userType === "KAKAO" ? { kakaoId: args.email } : {}
                    const user = await ctx.prisma.user.findUnique({ where });
                    if (!user) return throwError(errors.invalidUser, ctx);
                    if (user.state !== 'ACTIVE') return throwError(errors.invalidUser, ctx);
                    if (args.userType === "EMAIL" && !compareSync(args.password, user.password)) return throwError(errors.invalidUser, ctx);
                   
                    const accessToken = await generateUserToken(ctx.prisma, user.id)
                    //todo 
                    let encryptId = encrypt(user.id.toString());
                    console.log("login encrypt", encryptId);
                    const refreshToken = generateToken(encryptId, "userId", true)
                    const db = await ctx.prisma.user.update({
                        where : {
                            id : user.id
                        },
                        data : {
                            token : refreshToken,
                            createdToken : new Date()
                        }
                    })
                    if(!db) return throwError(errors.etc("토큰 저장에 실패하였습니다."),ctx);
                    return { accessToken: accessToken, refreshToken: refreshToken };
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        // t.field("signInUserForImageProgramByEveryone", {//이거 안씀 
        //     type: nonNull("String"),//return type 
        //     args: {
        //         userType: nonNull(arg({ type: "UserLoginType" })),
        //         email: nonNull(stringArg()),
        //         password: nonNull(stringArg({ description: "소셜의 경우 그냥 빈 문자열" })),
        //     },
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             if (args.userType === 'ADMIN') {
        //                 if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
        //                 const admin = await ctx.prisma.admin.findUnique({ where: { login_id: args.email } });
        //                 if (!admin) return throwError(errors.invalidUser, ctx);
        //                 if (!compareSync(args.password, admin.password)) return throwError(errors.invalidUser, ctx);
        //                 return generateToken(admin.id, "adminId", false);
        //             }
        //             else {
        //                 if (args.userType === "EMAIL" && !regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
        //                 const where = args.userType === "EMAIL" ? { email: args.email } : args.userType === "NAVER" ? { naverId: args.email } : args.userType === "KAKAO" ? { kakaoId: args.email } : {}
        //                 const user = await ctx.prisma.user.findUnique({ where });
        //                 if (!user) return throwError(errors.invalidUser, ctx);
        //                 if (user.state !== 'ACTIVE') return throwError(errors.invalidUser, ctx);
        //                 if (args.userType === "EMAIL" && !compareSync(args.password, user.password)) return throwError(errors.invalidUser, ctx);
        //                 const purchaseInfo = await getPurchaseInfo(ctx.prisma, user.id);
        //                 const d = purchaseInfo.additionalInfo.find(v => v.type === 'IMAGE_TRANSLATE');
        //                 if (!d) return throwError(errors.additionalPermissionRequired, ctx);
        //                 if (isBefore(d.expiredAt, new Date())) throw errors.additionalPermissionRequired;
        //                 return await generateUserToken(ctx.prisma, user.id);
        //             }
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // });
        t.field("connectSocialIdByUser", {
            type: nonNull("User"),//return 타입 
            args: {
                userType: nonNull(arg({ type: "UserSocialType" })),
                socialId: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.userType === "EMAIL") return throwError(errors.etc("잘못된 소셜 타입입니다."), ctx);
                    const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
                    if (!user) return throwError(errors.invalidUser, ctx);
                    const data: { naverId?: string, kakaoId?: string } = {};
                    if (args.userType === "KAKAO") {
                        if (user.kakaoId) return throwError(errors.etc("카카오 계정은 이미 연동되어 있습니다."), ctx);
                        const existingUser = await ctx.prisma.user.count({ where: { kakaoId: { equals: args.socialId } } });
                        if (existingUser > 0) return throwError(errors.etc("해당 카카오 계정은 다른 계정과 연동되어 있습니다."), ctx);
                        data.kakaoId = args.socialId;
                    }
                    if (args.userType === "NAVER") {
                        if (user.naverId) return throwError(errors.etc("네이버 계정은 이미 연동되어 있습니다."), ctx);
                        const existingUser = await ctx.prisma.user.count({ where: { naverId: { equals: args.socialId } } });
                        if (existingUser > 0) return throwError(errors.etc("해당 네이버 계정은 다른 계정과 연동되어 있습니다."), ctx);
                        data.naverId = args.socialId;
                    }
                    return await ctx.prisma.user.update({ where: { id: user.id }, data })!;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updatePhoneByUser", {
            type: nonNull("Boolean"),
            args: {
                phone: nonNull(stringArg()),
                verificationId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                    const tel = args.phone.replace(regexPattern.phone, "0$1$2$3");
                    const verification = await ctx.prisma.phoneVerification.findUnique({ where: { id: args.verificationId } });
                    if (!verification) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                    await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });
                    await ctx.prisma.userInfo.update({ where: { userId: ctx.token!.userId! }, data: { phone: tel } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateMyImageByUser", {
            type: nonNull("Boolean"),
            args: {
                fixImageTop: stringArg(),
                fixImageSubTop : stringArg(),
                fixImageBottom: stringArg(),
                fixImageSubBottom : stringArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    //todoconsole.log("fixImageTop",args.fixImageTop);
                    await ctx.prisma.userInfo.update({
                        where: { userId: ctx.token!.userId! },
                        data: {
                            fixImageSubTop :args.fixImageSubTop && /^https?:/.test(args.fixImageSubTop) ? args.fixImageSubTop : undefined, 
                            fixImageTop: args.fixImageTop && /^https?:/.test(args.fixImageTop) ? args.fixImageTop : undefined,//ReqExp test() method는 문자열이 일치하면 true 아니면 false반환하는 함수 
                            fixImageSubBottom : args.fixImageSubBottom && /^https?:/.test(args.fixImageSubBottom) ? args.fixImageSubBottom : undefined, 
                            fixImageBottom: args.fixImageBottom && /^https?:/.test(args.fixImageBottom) ? args.fixImageBottom : undefined,//즉 https로 시작하는지 여부를 보는거같다.
                        }
                    });

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateMyDataByUser", {//todo error
            type: nonNull("Boolean"),
            args: {
                marginRate: floatArg(),
                defaultShippingFee: intArg(),
                fixImageTop: arg({ type: "Upload" }),
                fixImageSubTop : arg({type: "Upload"}),
                fixImageBottom: arg({ type: "Upload" }),
                fixImageSubBottom : arg({ type: "Upload" }),
                cnyRate: floatArg(),
                additionalShippingFeeJeju: intArg(),
                asTel: stringArg(),
                asInformation: stringArg(),
                refundShippingFee: intArg(),
                exchangeShippingFee: intArg(),
                naverOriginCode: stringArg(),
                naverOrigin: stringArg(),
                naverStoreUrl: stringArg(),
                naverStoreOnly: stringArg(),
                naverFee: floatArg(),
                coupangOutboundShippingTimeDay: intArg(),
                coupangUnionDeliveryType: stringArg(),
                coupangMaximumBuyForPerson: intArg(),
                coupangLoginId: stringArg(),
                coupangVendorId: stringArg(),
                coupangAccessKey: stringArg(),
                coupangSecretKey: stringArg(),
                coupangImageOpt: stringArg(),
                coupangFee: floatArg(),
                coupangDefaultOutbound: stringArg(),
                coupangDefaultInbound: stringArg(),
                streetApiKey: stringArg(),
                streetApiKey2: stringArg(),
                streetApiKey3: stringArg(),
                streetApiKey4: stringArg(),
                streetFee: floatArg(),
                streetNormalApiKey: stringArg(),
                streetNormalApiKey2: stringArg(),
                streetNormalApiKey3: stringArg(),
                streetNormalApiKey4: stringArg(),
                streetDefaultOutbound: stringArg(),
                streetDefaultInbound: stringArg(),
                streetNormalOutbound: stringArg(),
                streetNormalInbound: stringArg(),
                streetNormalFee: floatArg(),
                interparkCertKey: stringArg(),
                interparkSecretKey: stringArg(),
                interparkFee: floatArg(),
                esmplusMasterId: stringArg(),
                esmplusAuctionId: stringArg(),
                esmplusGmarketId: stringArg(),
                gmarketFee: floatArg(),
                auctionFee: floatArg(),
                lotteonVendorId: stringArg(),
                lotteonApiKey: stringArg(),
                lotteonFee: floatArg(),
                lotteonNormalFee: floatArg(),
                wemakepriceId: stringArg(),
                wemakepriceFee: floatArg(),
                tmonId: stringArg(),
                tmonFee: floatArg(),
                optionAlignTop: stringArg(),
                optionTwoWays: stringArg(),
                optionIndexType: intArg(),
                discountAmount: intArg(),
                discountUnitType: stringArg(),
                descriptionShowTitle: stringArg(),
                collectTimeout: intArg(),
                collectStock: intArg(),
                marginUnitType: stringArg(),
                extraShippingFee: intArg(),
                streetUseType : stringArg(),
                streetUseKeyType : stringArg(),
                streetNormalUseKeyType : stringArg(),
                lotteonUseType : stringArg(),
                naverAutoSearchTag : stringArg(),
                naverUseType : stringArg(),
                coupangUseType : stringArg(),
                streetNormalUseType : stringArg(),
                gmarketUseType :stringArg(),
                auctionUseType :stringArg(),
                interparkUseType:stringArg(),
                wemakepriceUseType:stringArg(),
                lotteonNormalUseType:stringArg(),
                tmonUseType:stringArg(),
                lotteonSellerType : stringArg(),
                interparkEditCertKey : stringArg(),
                interparkEditSecretKey : stringArg(),
                autoPrice : stringArg(),
                defaultPrice : stringArg(),
                streetApiMemo : stringArg(),
                streetApiMemo2 : stringArg(),
                streetApiMemo3 : stringArg(),
                streetApiMemo4 : stringArg(),
                streetNormalApiMemo : stringArg(),
                streetNormalApiMemo2 : stringArg(),
                streetNormalApiMemo3 : stringArg(),
                streetNormalApiMemo4 : stringArg(),
                calculateWonType :stringArg(),
                cnyRateDollar :floatArg(),
                cnyRateYen :floatArg(),
                cnyRateEuro:floatArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if ((args.marginRate ?? 1) < 0) return throwError(errors.etc("마진율은 음수일 수 없습니다."), ctx);
                    if ((args.defaultShippingFee ?? 1) < 0) return throwError(errors.etc("기본 해외배송비는 음수일 수 없습니다."), ctx);
                    
                    args.marginRate = args.marginRate ?? undefined;
                    args.defaultShippingFee = args.defaultShippingFee ?? undefined;
                    args.cnyRate = args.cnyRate ?? undefined;
                    
                    let fixImageTop: string | null | undefined = args.fixImageTop ? "" : args.fixImageTop;
                    let fixImageBottom: string | null | undefined = args.fixImageBottom ? "" : args.fixImageBottom;
                    let fixImageSubTop: string | null | undefined = args.fixImageSubTop ? "" : args.fixImageSubTop;
                    let fixImageSubBottom: string | null | undefined = args.fixImageSubBottom ? "" : args.fixImageSubBottom;

                    if (args.fixImageTop) {
                        fixImageTop = (await uploadToS3(args.fixImageTop, ["user", ctx.token!.userId!, "info"])).url;//db에 user/유저아디(352)/info/top.jpg
                    }

                    if (args.fixImageSubTop) {
                        fixImageSubTop =  (await uploadToS3(args.fixImageSubTop, ["user", ctx.token!.userId!, "info"])).url;
                    }

                    if (args.fixImageBottom) {
                        fixImageBottom = (await uploadToS3(args.fixImageBottom, ["user", ctx.token!.userId!, "info"])).url;
                    }

                    if (args.fixImageSubBottom) {
                        fixImageSubBottom =  (await uploadToS3(args.fixImageSubBottom, ["user", ctx.token!.userId!, "info"])).url;
                    }

                    const asTel = args.asTel ? args.asTel.trim() : undefined;
                    const asInformation = args.asInformation ? args.asInformation.trim() : undefined;

                    asTel && validateStringLength(ctx, asTel, 20, "A/S 전화번호");
                    asInformation && validateStringLength(ctx, asInformation, 1000, "A/S 안내내용");

                    await ctx.prisma.userInfo.update({
                        where: { userId: ctx.token!.userId! },
                        data: {
                            marginRate: args.marginRate,
                            defaultShippingFee: args.defaultShippingFee,
                            fixImageTop ,
                            fixImageBottom,
                            fixImageSubTop,
                            fixImageSubBottom ,
                            cnyRate :  args.cnyRate,
                            cnyRateDollar : args.cnyRateDollar  ?? undefined,
                            cnyRateYen :args.cnyRateYen  ?? undefined,
                            cnyRateEuro:args.cnyRateEuro  ?? undefined,
                            additionalShippingFeeJeju: args.additionalShippingFeeJeju ?? undefined,
                            asTel : asTel,
                            asInformation,
                            refundShippingFee: args.refundShippingFee ?? undefined,
                            exchangeShippingFee: args.exchangeShippingFee ?? undefined,
                            naverOriginCode: args.naverOriginCode ?? undefined,
                            naverOrigin: args.naverOrigin ?? undefined,
                            naverStoreUrl: args.naverStoreUrl ?? undefined,
                            naverStoreOnly: args.naverStoreOnly ?? undefined,
                            naverFee: args.naverFee ?? undefined,
                            coupangOutboundShippingTimeDay: args.coupangOutboundShippingTimeDay ?? undefined,
                            coupangUnionDeliveryType: args.coupangUnionDeliveryType ?? undefined,
                            coupangMaximumBuyForPerson: args.coupangMaximumBuyForPerson ?? undefined,
                            coupangLoginId: args.coupangLoginId ?? undefined,
                            coupangVendorId: args.coupangVendorId ?? undefined,
                            coupangAccessKey: args.coupangAccessKey ?? undefined,
                            coupangSecretKey: args.coupangSecretKey ?? undefined,
                            coupangImageOpt: args.coupangImageOpt ?? undefined,
                            coupangDefaultOutbound: args.coupangDefaultOutbound ?? undefined,
                            coupangDefaultInbound: args.coupangDefaultInbound ?? undefined,
                            coupangFee: args.coupangFee ?? undefined,
                            streetApiKey: args.streetApiKey ?? undefined,
                            streetApiKey2: args.streetApiKey2 ?? undefined,
                            streetApiKey3: args.streetApiKey3 ?? undefined,
                            streetApiKey4: args.streetApiKey4 ?? undefined,
                            streetFee: args.streetFee ?? undefined,
                            streetNormalApiKey: args.streetNormalApiKey ?? undefined,
                            streetNormalApiKey2: args.streetNormalApiKey2 ?? undefined,
                            streetNormalApiKey3: args.streetNormalApiKey3 ?? undefined,
                            streetNormalApiKey4: args.streetNormalApiKey4 ?? undefined,
                            streetDefaultOutbound: args.streetDefaultOutbound ?? undefined,
                            streetDefaultInbound: args.streetDefaultInbound ?? undefined,
                            streetNormalOutbound: args.streetNormalOutbound ?? undefined,
                            streetNormalInbound: args.streetNormalInbound ?? undefined,
                            streetNormalFee: args.streetNormalFee ?? undefined,
                            interparkCertKey: args.interparkCertKey ?? undefined,
                            interparkEditCertKey : args.interparkEditCertKey ?? undefined ,
                            interparkEditSecretKey : args.interparkEditSecretKey ?? undefined,
                            interparkSecretKey: args.interparkSecretKey ?? undefined,
                            interparkFee: args.interparkFee ?? undefined,
                            esmplusMasterId: args.esmplusMasterId ?? undefined,
                            esmplusAuctionId: args.esmplusAuctionId ?? undefined,
                            esmplusGmarketId: args.esmplusGmarketId ?? undefined,
                            gmarketFee: args.gmarketFee ?? undefined,
                            auctionFee: args.auctionFee ?? undefined,
                            lotteonVendorId: args.lotteonVendorId ?? undefined,
                            lotteonApiKey: args.lotteonApiKey ?? undefined,
                            lotteonFee: args.lotteonFee ?? undefined,
                            lotteonNormalFee: args.lotteonNormalFee ?? undefined,
                            wemakepriceId: args.wemakepriceId ?? undefined,
                            wemakepriceFee: args.wemakepriceFee ?? undefined,
                            tmonId: args.tmonId ?? undefined,
                            tmonFee: args.tmonFee ?? undefined,
                            optionAlignTop: args.optionAlignTop ?? undefined,
                            optionTwoWays: args.optionTwoWays ?? undefined,
                            optionIndexType: args.optionIndexType ?? undefined,
                            discountAmount: args.discountAmount ?? undefined,
                            discountUnitType: args.discountUnitType ?? undefined,
                            descriptionShowTitle: args.descriptionShowTitle ?? undefined,
                            collectTimeout: args.collectTimeout ?? undefined,
                            collectStock: args.collectStock ?? undefined,
                            marginUnitType: args.marginUnitType ?? undefined,
                            extraShippingFee: args.extraShippingFee ?? undefined,
                            streetUseType : args.streetUseType ?? undefined,
                            streetUseKeyType : args.streetUseKeyType ?? undefined,
                            streetNormalUseKeyType : args.streetNormalUseKeyType ?? undefined,
                            lotteonUseType : args.lotteonUseType ?? undefined,
                            naverAutoSearchTag : args.naverAutoSearchTag ?? undefined,
                            naverUseType : args.naverUseType ?? undefined,
                            coupangUseType : args.coupangUseType ?? undefined,
                            streetNormalUseType : args.streetNormalUseType ?? undefined,
                            gmarketUseType :args.gmarketUseType ?? undefined,
                            auctionUseType :args.auctionUseType ?? undefined,
                            interparkUseType:args.interparkUseType ?? undefined,
                            wemakepriceUseType:args.wemakepriceUseType ?? undefined,
                            lotteonNormalUseType:args.lotteonNormalUseType ?? undefined,
                            tmonUseType:args.tmonUseType ?? undefined,
                            lotteonSellerType : args.lotteonSellerType ?? undefined,
                            autoPrice : args.autoPrice ?? undefined,
                            defaultPrice : args.defaultPrice ?? undefined,
                            streetApiMemo : args.streetApiMemo ?? undefined,
                            streetApiMemo2 : args.streetApiMemo2 ?? undefined,
                            streetApiMemo3 : args.streetApiMemo3 ?? undefined,
                            streetApiMemo4 : args.streetApiMemo4 ?? undefined,
                            streetNormalApiMemo : args.streetNormalApiMemo ?? undefined,
                            streetNormalApiMemo2 : args.streetNormalApiMemo2 ?? undefined,
                            streetNormalApiMemo3 : args.streetNormalApiMemo3 ?? undefined,
                            streetNormalApiMemo4 : args.streetNormalApiMemo4 ?? undefined,
                            calculateWonType : args.calculateWonType ?? undefined,
                        }
                    });

                    return true;
                } catch (e) {
                    return throwError(errors.notAuthenticated, ctx);
                }
            }
        });
        t.field("changePasswordByUser", {
            type: nonNull("Boolean"),
            args: {
                currentPassword: nonNull(stringArg()),
                newPassword: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });

                    
                    if (!user) return throwError(errors.noSuchData, ctx);
                    if (!compareSync(args.currentPassword, user.password)) return throwError(errors.etc("현재 비밀번호가 다릅니다."), ctx);
                    const password = hashSync(args.newPassword);
                    await ctx.prisma.user.update({ where: { id: ctx.token!.userId! }, data: { password } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        // t.field("withdrawByUser", {
        //     type: nonNull("Boolean"),
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
        //             if (!user) return throwError(errors.noSuchData, ctx);
        //             const withdraw = await ctx.prisma.withDraw.create({
        //                 data: {
        //                     email: user.email,
        //                     kakaoId: user.kakao_id,
        //                     naverId: user.naver_id,
        //                     withdrawAt: new Date(),
        //                 }
        //             });
        //             await ctx.prisma.user.update({
        //                 where: { id: user.id },
        //                 data: {
        //                     email: withdraw.id.toString(), naver_id: null, kakao_id: null,
        //                     state: "DELETED",
        //                 }
        //             })
        //             return true;
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // })
        t.field("setMaxProductLimitByAdmin", {
            type: nonNull("Boolean"),
            args: {
                userId: nonNull(intArg()),
                productLimit: intArg({ description: "미설정시 무제한" })
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.userInfo.findUnique({ where: { userId: args.userId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    await ctx.prisma.userInfo.update({ where: { userId: user.userId }, data: { maxProductLimit: args.productLimit ?? null } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});