import { faIR } from "date-fns/locale";
import deepmerge from "deepmerge";
import { extendType, list, nonNull } from "nexus";
import { errors, throwError } from "../../utils/error";

import { uploadToS3AvoidDuplicate, uploadToS3AvoidDuplicateByBuffer, uploadToS3WithEditor,deleteFromS3,deleteS3Folder,getProductListAllKeys } from "../../utils/file_manage";

export const query_product = extendType({
    type: "Query",
    definition(t) {
        t.crud.products({
            alias: "selectMyProductByUser",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
                    //todoconsole.log("args.where = ",args.where);
                    if (args.where?.state?.equals === null) {
                        args.where.state.equals = undefined;
                    }
                    if (args.where?.isImageTranslated?.equals === null) {
                        args.where.isImageTranslated.equals = undefined;
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("selectMyProductsCountByUser", {
            type: nonNull("Int"),
            args: {
                where: "ProductWhereInput"
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
                    if (args.where?.state?.equals === null) {
                        args.where.state.equals = undefined;
                    }
                    if (args.where?.isImageTranslated?.equals === null) {
                        args.where.isImageTranslated.equals = undefined;
                    }
                    return ctx.prisma.product.count({ where: args.where as any });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.crud.products({
            alias: "selectProductsByAdmin",
            filtering: true,
            ordering: true,
            pagination: true,
        })
        t.field("selectProductsCountByAdmin", {
            type: "Int",
            args: {
                where: "ProductWhereInput"
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    return ctx.prisma.product.count({ where: args.where as any });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.crud.products({
            alias: "selectProductsBySomeone",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    if (ctx.token?.userId) {
                        args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token.userId } });
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("selectProductsCountBySomeone", {
            type: "Int",
            args: {
                where: "ProductWhereInput"
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (ctx.token?.userId) {
                        args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token.userId } });
                    }
                    return ctx.prisma.product.count({ where: args.where as any });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("testS3DeleteProduct",{
            type : "String",
            resolve: async(src,args,ctx,info)=>{
                try{
                    //?????? ???????????? ???????????? ?????? minio??? ?????????????????? ??????????????????
                    //?????? 46949 ???????????? ??????????????? minio??? ??????????????? ???????????? ????????????
                    //?????? 1?????? 46949 ????????? ????????? product??? ???????????? ?????? id??? ??????
                    //?????? ???????????? ?????? ??????????????? ???????????? ??????????????? S3 roof?????? 
                    let product = await ctx.prisma.product.findMany({
                        select : { id : true}
                    })
                    let test : any []= [];
                    for(var v of product){
                        test.push(v.id);
                    }
                    let Allnumber = Array.from(Array(46949).keys());
                    const tt = Allnumber.filter(x => !test.includes(x));// ??????????????????
                    // let ttt = Array.from(Array(766).keys());//??????????????? ???????????? 
                    // const tt2=tt.filter(x => !ttt.includes(x));//??????????????? ???????????? 
                    //console.log(tt);
                    
        await Promise.all (
            tt.map(async(v:any) => {
            await deleteS3Folder(`product/${v}/`);
        }) 
        )
                    return "ok";
                }catch(e){
                    return throwError(e, ctx);
                }

            }
        })
    }
});