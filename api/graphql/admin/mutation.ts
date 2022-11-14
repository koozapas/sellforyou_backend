import { hashSync, compareSync } from "bcryptjs";
import { arg, extendType, intArg, nonNull, stringArg } from "nexus";
import { regexPattern } from "../../utils/constants";
import { errors, throwError } from "../../utils/error";
import { generateToken } from "../../utils/helpers";

export const mutation_admin = extendType({
    type: "Mutation",
    definition(t) {
        t.field("signUpAdminByAdmin", {
            type: nonNull("Boolean"),
            args: {
                id: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (await ctx.prisma.admin.findUnique({ where: { loginId: args.id } })) return throwError(errors.etc("해당 이메일이 이미 존재합니다."), ctx);
                    const admin = await ctx.prisma.admin.create({ data: { loginId: args.id, password: hashSync(args.password), state: "ACTIVE", } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("signInAdminByEveryone", {
            type: nonNull("SignInType"),
            args: {
                id: nonNull(stringArg()),
                password: nonNull(stringArg({ description: "소셜의 경우 그냥 빈 문자열" })),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const admin = await ctx.prisma.admin.findUnique({ where: { loginId: args.id } });
                    if (!admin) return throwError(errors.invalidUser, ctx);
                    if (!compareSync(args.password, admin.password)) return throwError(errors.invalidUser, ctx);
                    const accessToken = generateToken(admin.id, "adminId", false);
                    const refreshToken = generateToken(admin.id, "adminId", true);
                    
                    const update = await ctx.prisma.admin.update({
                        where : {
                            id : admin.id
                        },
                        data : {
                            token : refreshToken,
                            createdToken : new Date()
                        }
                    }) 
                    if(!update) return throwError(errors.etc("token 삽입에 실패하였습니다."),ctx);

                    return { accessToken, refreshToken };
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("deleteStore",{
            type: nonNull("Boolean"),
            args: { 
                store : nonNull(stringArg()),
                id : nonNull(intArg())
            },
            resolve: async (src,args, ctx, info) => {
                try {
                    switch(args.store) {
                        case 'smart' : 
                        await ctx.prisma.userInfo.update({
                            where : { userId : args.id},
                            data : { 
                                naverStoreUrl : ""
                            }
                        })
                        break;
                        case 'coupang':
                        await ctx.prisma.userInfo.update({
                            where : { userId : args.id},
                            data : { 
                                coupangLoginId : "",
                                coupangVendorId : "",
                                coupangAccessKey : "",
                                coupangSecretKey : "",
                            }
                        })
                        break;
                        case '11street-global':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    streetApiKey : "",
                                    streetApiKey2 : "",
                                    streetApiKey3 : "",
                                    streetApiKey4 : "",
                                }
                            })
                        break;
                        case '11street-normal':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    streetNormalApiKey : "",
                                    streetNormalApiKey2 : "",
                                    streetNormalApiKey3 : "",
                                    streetNormalApiKey4 : "",
                                }
                            })
                        break;
                        case 'interpark':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    interparkCertKey : "",
                                    interparkSecretKey : "",
                                    interparkEditCertKey : "",
                                    interparkEditSecretKey : "",
                                }
                            })
                        break;
                        case 'gmarket':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    esmplusGmarketId : "",
                                }
                            })
                        break;
                        case 'aution':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    esmplusAuctionId : ""
                                }
                            })
                        break;
                        case 'tmon':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    tmonId : ""
                                }
                            })
                        break;
                        case 'wemake':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    wemakepriceId : ""
                                }
                            })
                        break;
                        case 'lotteon':
                            await ctx.prisma.userInfo.update({
                                where : { userId : args.id},
                                data : { 
                                    lotteonApiKey : "",
                                    lotteonVendorId : ""
                                }
                            })
                        break;
                        default : return throwError(errors.etc("스토어명이 존재하지 않습니다."),ctx);
                    }

                    return true;
                }catch(e){
                    return throwError(e,ctx);
                }
            }
        })
        t.field("changeMyPasswordByAdmin", {
            type: nonNull("Boolean"),
            args: {
                currentPassword: nonNull(stringArg()),
                newPassword: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const admin = await ctx.prisma.admin.findUnique({ where: { id: ctx.token!.adminId! } });
                    if (!admin) return throwError(errors.noSuchData, ctx);
                    if (!compareSync(args.currentPassword, admin.password)) return throwError(errors.etc("현재 비밀번호가 다릅니다."), ctx);
                    const password = hashSync(args.newPassword);
                    await ctx.prisma.admin.update({ where: { id: ctx.token!.adminId! }, data: { password } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});