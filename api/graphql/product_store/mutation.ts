//product_store/mutation
import { extendType, intArg,  nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import { uploadToS3AvoidDuplicate, uploadToS3AvoidDuplicateByBuffer, uploadToS3WithEditor,deleteFromS3,deleteS3Folder,getProductListAllKeys } from "../../utils/file_manage";

export const mutation_product_store = extendType({
    type: "Mutation",
    definition(t) {
        t.field("unlinkProductStore",{
            type: nonNull("Boolean"),
            args: {
                productId : nonNull(intArg()),
                siteCode : nonNull(stringArg())
            },
            resolve : async (src,args,ctx,info)=> {
                try{
                     
                    if(!ctx.token?.userId) return throwError(errors.etc("올바르지 않은 유저입니다."),ctx);

                    const productStore = await ctx.prisma.productStore.findFirst({
                        where : {
                            productId :args.productId,
                            siteCode : args.siteCode,
                            userId : ctx.token?.userId
                        }
                    })
                    if(!productStore) return throwError(errors.etc("이미 연동이 해제된 상품입니다."),ctx);

                    const stop = await ctx.prisma.productStore.update({
                        where: {
                            id : productStore.id
                        },
                        data : {
                            state : 4,
                            inflow : 0,
                        }
                    })

                    if(!stop) return throwError(errors.etc("연동 해제 실패하였습니다."),ctx);
                    
                    await ctx.prisma.productStoreLog.deleteMany({
                        where : {
                            productStoreId : productStore.id
                        }
                    })

                    const result = await ctx.prisma.productStore.findMany({
                        where : {
                            productId :args.productId,
														state: 2,
														userId : ctx.token?.userId
                        }
                    })


					if (result.length < 1) {
						
                        const product = await ctx.prisma.product.findMany({
                            where: { id: {in : args.productId }},
                            select: { id: true, userId: true, productStore: true, productOptionName: { select: { id: true } } }
                        });
                        if (!product) return throwError(errors.noSuchData, ctx);
                
                        if (ctx.token?.userId && product[0].userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 삭제할 수 없습니다."), ctx);
                
                        await ctx.prisma.productOption.deleteMany({ where: { productId: { in : args.productId }  } });
                
                        const productOptionNameId : any=[] ;
                        const productStoreId : any =[];
                
                        product.map((v : any) => {
                            v.productStore.map((w :any) => {productStoreId.push(w.id)}) 
                            v.productOptionName.map((w :any) => {productOptionNameId.push(w.id)}) 
                        })
                
                        await deleteS3Folder(`product/${args.productId}/`);
                
                        await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: productStoreId } } });
                        await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: productOptionNameId } } });
                        await ctx.prisma.productViewLog.deleteMany({where : {productStoreId : {in : productStoreId }}})
                        await ctx.prisma.productStore.deleteMany({ where: { productId: { in: args.productId } } });
                        await ctx.prisma.productOptionName.deleteMany({ where: { productId: {in : args.productId} } });
                        await ctx.prisma.product.deleteMany({ where: { id: {in :args.productId} } });
					}

                    return true;
                }catch(e){
                    return throwError(e, ctx);
                }
            }
        })
    }
});