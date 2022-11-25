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
                    //로직 간단하게 설명하면 일단 minio의 더미데이터를 제거해야한다
                    //우선 46949 이후로는 제품삭제시 minio도 삭제했기에 거기까지 배열생성
                    //그후 1부터 46949 까지의 배열중 product에 존재하는 배열 id값 제거
                    //그뒤 제거되고 남은 데이터들은 필요없는 항목이므로 S3 roof예정 
                    let product = await ctx.prisma.product.findMany({
                        select : { id : true}
                    })
                    let test : any []= [];
                    for(var v of product){
                        test.push(v.id);
                    }
                    let Allnumber = Array.from(Array(46949).keys());
                    const tt = Allnumber.filter(x => !test.includes(x));// 있는배열제거
                    // let ttt = Array.from(Array(766).keys());//단순확인용 제거대상 
                    // const tt2=tt.filter(x => !ttt.includes(x));//단순확인용 제거대상 
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