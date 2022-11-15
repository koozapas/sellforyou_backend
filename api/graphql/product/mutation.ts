import { GraphQLResolveInfo } from "graphql";
import { arg, extendType, floatArg, intArg, list, nonNull, stringArg } from "nexus";
import { ArgsValue, booleanArg, isObject } from "nexus/dist/core";
import { Context } from "../../types";
import { errors, throwError } from "../../utils/error";
import { uploadToS3AvoidDuplicate, uploadToS3AvoidDuplicateByBuffer, uploadToS3WithEditor,deleteFromS3,deleteS3Folder,getProductListAllKeys } from "../../utils/file_manage";
import { calculatePrice } from "../../utils/local/calculate-product-price";
import { publishUserLogData } from "../../utils/local/pubsub";
import { SiilEncodedSavedData, siilInfo } from "../siil";
import { t_ProductOption } from './model';
import { prisma } from '@prisma/client';
import { ar } from "date-fns/locale";
import { ProductStoreStateEnum } from "../../graphql";
import { shopDataUrlInfo } from "../../playauto_api_type";
// it is will delete after update to front todo 
const initProductImageByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductImageByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        
        if (!product) {
            return throwError(errors.noSuchData, ctx);
        }

        let taobaoData = JSON.parse(product.taobaoProduct.originalData);

        let imageThumbnailData = JSON.stringify(taobaoData.item_imgs.map((v: any) => "http:" + v.url.replace(/^https?:/, "")));
        let desc_html = ``;

        for (var i in taobaoData.desc_img) {
            desc_html += `<img src=${taobaoData.desc_img[i]} alt="" />`;
        }

        await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                description: desc_html,
                imageThumbnailData,
                isImageTranslated: false
            }
        });

        product.productOptionName.map((v: any) => {
            if (v.productId === product.id) {
                v.productOptionValue.map((w: any) => {
                    let code = `${v.taobaoPid}:${w.taobaoVid}`;

                    taobaoData.prop_imgs.prop_img.map(async (x: any) => {
                        if (code === x.properties) {
                            await ctx.prisma.productOptionValue.update({ 
                                where: { id: w.id }, data: { 
                                    image: x.url,
                                }
                            });
                        }
                    })
                })
            }
        });

        return "OK";
    } catch (e) {
        return throwError(e, ctx);
    }
}

const initProductThumbnailImageByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductThumbnailImageByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        
        if (!product) {
            return throwError(errors.noSuchData, ctx);
        }

        let taobaoData = JSON.parse(product.taobaoProduct.originalData);

        let imageThumbnailData = JSON.stringify(taobaoData.item_imgs.map((v: any) => "http:" + v.url.replace(/^https?:/, "")));

        await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                imageThumbnailData,
                isImageTranslated: false
            }
        });

        return imageThumbnailData;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const initProductOptionImageByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductOptionImageByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        
        if (!product) {
            return throwError(errors.noSuchData, ctx);
        }

        let taobaoData = JSON.parse(product.taobaoProduct.originalData);
        interface returnDataType {
            data : {
                
            }[] 
        };

        const returnData = { data : [] } as returnDataType;
        let optionId ='';

        let test = product.productOptionName.map((v: any) => {
            let temp = v.productOptionValue.map((w: any) => {
                let code = `${v.taobaoPid}:${w.taobaoVid}`;
                let result = taobaoData.prop_imgs.prop_img.find((x:any) => x.properties === code )
                    return { id : w.id , img : !result ? null : result.url};
            })
            
           

            return { id : v.id , optionValues : temp}
         });
            
         test.map( (data : any) => {
            data.optionValues.map(async( valueData : any) => {
                console.log(`option ID = ${valueData.id}  image = ${valueData.img}`);
                await ctx.prisma.productOptionValue.update({
                    where : {
                        id: valueData.id
                    },
                    data : {
                        image : valueData.img
                    }
                })
            })
         })
         
        return JSON.stringify(test);
    } catch (e) {
        return throwError(e, ctx);
    }
}

const initProductDescriptionByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductDescriptionByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        
        if (!product) {
            return throwError(errors.noSuchData, ctx);
        }

        let taobaoData = JSON.parse(product.taobaoProduct.originalData);
        let description = await uploadToS3WithEditor(taobaoData.desc, ["product", product.id], "description")
        // let desc_html = ``;

        // for (var i in taobaoData.desc_img) {
        //     desc_html += `<img src=${taobaoData.desc_img[i]} alt="" />`;
        // }

        await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                description: description,
                isImageTranslated: false
            }
        });

        return description;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateProductOptionShippingFee = async(src:{},args: ArgsValue<"mutation","updateProductOptionShippingFee">,ctx: Context,info : GraphQLResolveInfo)  => {
    try{
        const productOption = ctx.prisma.productOption.update({
            where : {id : args.productOptionId},
            data : {
                defaultShippingFee : args.defaultShippingFee
            }
        })
        if(!productOption) return throwError(errors.etc("업데이트를 할수 없습니다."),ctx);
        return "OK"
    }
    catch(e){
        return throwError(e,ctx);
    }
}
const updateProductOptionResolver = async(src:{},args: ArgsValue<"mutation","updateProductOption">,ctx: Context,info : GraphQLResolveInfo) => {
    try{
        if(args.productOption.length !== 0 ){
        await ctx.prisma.productOption.deleteMany({ where: { productId : args.productOption[0].productId } });
       
        const test = await ctx.prisma.productOption.createMany({
            data : args.productOption.map((v : any)=>{
                return {
                    id: undefined,
                    productId : v.productId,
                    optionValue1Id : v.optionValue1Id,
                    optionValue2Id : v.optionValue2Id ? v.optionValue2Id : undefined,
                    optionValue3Id : v.optionValue3Id ? v.optionValue3Id : undefined,
                    optionValue4Id : v.optionValue4Id ? v.optionValue4Id : undefined,
                    optionValue5Id : v.optionValue5Id ? v.optionValue5Id : undefined,
                    isActive : v.isActive,
                    taobaoSkuId: v.taobaoSkuId,
                    priceCny : v.priceCny,
                    defaultShippingFee : v.defaultShippingFee,
                    price : v.price,
                    stock : v.stock,
                    optionString : v.optionString
                }
            })
            
        })
        const tt = await ctx.prisma.productOption.findMany({
            where : {
                productId : args.productOption[0].productId
            }            
        })
        let list : any = [];
        tt.map(async v =>{
            await list.push(v.id);
        })
        
        if(!test) return throwError(errors.etc("저장 실패"),ctx);
        return list;
    }else{
        let list : any = [];
        await ctx.prisma.productOption.deleteMany({ where: { productId : args.id } });
       return list;
    }
    }catch (e) {
        return throwError(e,ctx);
    }
}

const updateProductCategory = async (src: {}, args: ArgsValue<"Mutation", "updateProductCategory">, ctx: Context, info: GraphQLResolveInfo) => {
    const productStore = await ctx.prisma.productStore.findMany(
        {
            where : {
                productId : args.productId,
            }
        }
    )
    if(!productStore) return throwError(errors.etc("해당 product의 productStore가 존재하지 않습니다."),ctx);
    const result = await ctx.prisma.product.update(
        {
        where: { id: args.productId },
         data: {
            categoryA077: args.categoryA077 ?? undefined,
            categoryB378: args.categoryB378 ?? undefined,
            categoryA112: args.categoryA112 ?? undefined,
            categoryA027: args.categoryA027 ?? undefined,
            categoryA001: args.categoryA001 ?? undefined,
            categoryA006: args.categoryA006 ?? undefined,
            categoryB719: args.categoryB719 ?? undefined,
            categoryA113: args.categoryA113 ?? undefined,
            categoryA524: args.categoryA524 ?? undefined,
            categoryA525: args.categoryA525 ?? undefined,
            categoryB956: args.categoryB956 ?? undefined,
        }
    }
    )
    if(!result) return throwError(errors.etc("해당 product의 업데이트가 실패하였습니다."),ctx);
    return "OK";
    

}

const updateProductResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        
        if (!product) return throwError(errors.noSuchData, ctx);

        if (ctx.token?.userId && product.userId !== ctx.token.userId) {
            return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
        }

        //스토어에 등록된 상품일 경우에는 해당스토어의 카테고리가 수정되면 안되서 그런 처리를 했다고 한다.
        if (product.productStore.find(v => v.state === 2 && args.categoryA077 && v.siteCode === "A077")) {
            args.categoryA077 = product.categoryA077;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryB378 && v.siteCode === "B378")) {
            args.categoryB378 = product.categoryB378;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA112 && v.siteCode === "A112")) {
            args.categoryA112 = product.categoryA112;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA027 && v.siteCode === "A027")) {
            args.categoryA027 = product.categoryA027;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA001 && v.siteCode === "A001")) {
            args.categoryA001 = product.categoryA001;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA006 && v.siteCode === "A006")) {
            args.categoryA006 = product.categoryA006;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryB719 && v.siteCode === "B719")) {
            args.categoryB719 = product.categoryB719;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA113 && v.siteCode === "A113")) {
            args.categoryA113 = product.categoryA113;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA524 && v.siteCode === "A524")) {
            args.categoryA524 = product.categoryA524;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryA525 && v.siteCode === "A525")) {
            args.categoryA525 = product.categoryA525;
        }

        if (product.productStore.find(v => v.state === 2 && args.categoryB956 && v.siteCode === "B956")) {
            args.categoryB956 = product.categoryB956;
        }

        if (args.siilCode) {
            if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
        }
        
        const siil: SiilEncodedSavedData | null = (args.siilCode && args.siilData) ? { c: args.siilCode, d: args.siilData!.map(v => ({ c: v.code, v: v.value })) } : null;

        if (args.optionNames.length !== product.productOptionName.length) {
            return throwError(errors.etc("옵션명 중 누락된 부분이 발견되었습니다."), ctx);
        }

        if (args.optionValues.length !== product.productOptionName.flatMap(v => v.productOptionValue).length) {
            return throwError(errors.etc("옵션값 중 누락된 부분이 발견되었습니다."), ctx);
        }
        const data = await ctx.prisma.userInfo.findUnique({
            where :{
                userId : ctx.token!.userId!
            }
        })
        if(!data) return throwError(errors.etc("no token"),ctx);
        const calculateWonType = parseInt(data.calculateWonType);

        //todo 각 옵션 배열이 들어온다면 해당 옵션을 루프돌려서 업데이트 처리해주네 ..
        var productPrice = Math.round((args.price ?? product.price) / calculateWonType) * calculateWonType;

        if (args.options.length > 0) {
            productPrice = Math.min(...args.options.map(v => Math.round((v.price) / calculateWonType) * calculateWonType));
        }

        await Promise.all(product.productOption.map(async w => {
            var enabled = false;

            await Promise.all(args.options.map(async v => {
                if (v.id === w.id) {
                    await ctx.prisma.productOption.update({ where: { id: v.id }, data: { price: Math.round(v.price / calculateWonType) * calculateWonType, isActive: true, stock: v.stock } });

                    enabled = true;
                }
            }));

            if (!enabled) {
                await ctx.prisma.productOption.update({ where: { id: w.id }, data: { isActive: false } });
            }
        }));

        // await Promise.all(args.optionNames.map(async v => { // 수성 해당기능 setProductOptionNameBySomeOne에 추가함 
        //     await ctx.prisma.productOptionName.update({ where: { id: v.id }, data: { name: v.name.trim(), } });
        // }));

        // for (let v of args.optionValues) {// 수성 해당기능 setProductOptionValueBySomeOne에 추가함 
        //     let image = v.image ?? undefined;

        //     if (v.newImage) {sql
        //         image = await uploadToS3AvoidDuplicate(v.newImage, ["product", product.id]);
        //     }

        //     await ctx.prisma.productOptionValue.update({ where: { id: v.id }, data: { name: v.name.trim(), image, isActive: v.isActive ?? true } });
        // }

        //todo 1
        
         //todo 2
       

        const result = await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                name: args.name ?? undefined,
                price: productPrice ?? undefined,
                localShippingFee: args.localShippingFee ? (Math.round(args.localShippingFee / calculateWonType) * calculateWonType) : undefined,
                localShippingCode: args.localShippingCode,
                shippingFee: args.shippingFee ? (Math.round(args.shippingFee / calculateWonType) * calculateWonType) : undefined,
                categoryA077: args.categoryA077 ?? undefined,
                categoryB378: args.categoryB378 ?? undefined,
                categoryA112: args.categoryA112 ?? undefined,
                categoryA027: args.categoryA027 ?? undefined,
                categoryA001: args.categoryA001 ?? undefined,
                categoryA006: args.categoryA006 ?? undefined,
                categoryB719: args.categoryB719 ?? undefined,
                categoryA113: args.categoryA113 ?? undefined,
                categoryA524: args.categoryA524 ?? undefined,
                categoryA525: args.categoryA525 ?? undefined,
                categoryB956: args.categoryB956 ?? undefined,
                siilData: siil === null ? null : JSON.stringify(siil),
                siilCode: args.siilCode ?? undefined,
            }
        });

        return result;
    } catch (e) {
        return throwError(e, ctx);
    }
}
const updateDescription = async (src: {}, args: ArgsValue<"Mutation", "updateDescription">, ctx: Context, info: GraphQLResolveInfo) => { 
    try{
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }})
        if(!product) return throwError(errors.etc("해당 상품이 존재하지 않습니다."),ctx);
        const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
        if(!description) return throwError(errors.etc("description 업데이트 과정에 문제가 생겼습니다."),ctx);
        const success = await ctx.prisma.product.update({
            where : {id : product.id},
            data : { description }
        })
        if(!success) return throwError(errors.etc("업데이트 과정에 문제가 생겼습니다."),ctx);
        return description;
    }catch(e){
        return throwError(e,ctx);
    }
}

const updateImageThumbnailData =  async (src: {}, args: ArgsValue<"Mutation", "updateImageThumbnailData">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }})
        if(!product) return throwError(errors.etc("해당 상품이 존재하지 않습니다."),ctx);
        let imageThumbnailData = product.imageThumbnailData;
        let uploadImageresult : string[] = [];
        if (args.thumbnails && args.thumbnails.length > 0) {
            let imageArray: string[] = [];

            for (let v of args.thumbnails) {
                let image = v.defaultImage;

                if (v.uploadImage) {
                    image = await uploadToS3AvoidDuplicate(v.uploadImage, ["product", product.id]);
                    uploadImageresult.push("https://img.sellforyou.co.kr/sellforyou/"+image);
                }
                //썸네일 https 수정
                imageArray.push(image.replace(/^https?:/, "http:"));
            }
            imageThumbnailData = JSON.stringify(imageArray);
        }
        const success = await ctx.prisma.product.update({
            where : {id : args.productId},
            data : { imageThumbnailData }
        })

        if(!success) return throwError(errors.etc("업데이트 과정에 문제가 생겼습니다."),ctx);
        return uploadImageresult.toString();
    }
    catch(e){
        return throwError(e,ctx);
    }
}

const updateProductNameResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        if (!product) return throwError(errors.noSuchData, ctx);
        if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
        if (args.name.trim().length === 0) return throwError(errors.etc("이름을 입력하세요."), ctx);
        await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                name: args.name.trim(),
            }
        });
        return "OK";

    } catch (e) {
        return throwError(e, ctx);
    }
}


const updateMultipleProductNameByUser = async (src: {}, args: ArgsValue<"Mutation", "updateMultipleProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
      
        args.data.map(async (v : any) => {
            await ctx.prisma.product.update({
                where : { id : v.productIds},
                data : {
                    name : v.name
                }
            })
        })
            return "OK"
    } catch (e) {
        return throwError(e, ctx);
    }
}


const updateProductTagResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductTagByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
                await ctx.prisma.product.update({
                    where: { id: args.productId  },
                    data: {
                        searchTags: args.searchTags ,
                        immSearchTags : args.immSearchTags 
                    }
                });

        return "OK"
    } catch (e) {
        return throwError(e, ctx);
    }
}


const updateManyProductTagResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductTagByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        console.log("1", args.searchTags);
        console.log("2",args.immSearchTags);
                await ctx.prisma.product.updateMany({
                    where: { id: { in : args.productIds } },
                    data: {
                        searchTags: args.searchTags !== null?  args.searchTags : undefined,
                        immSearchTags : args.immSearchTags !== null ? args.immSearchTags : undefined
                    }
                });
        return "OK"
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductNameResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const products = await ctx.prisma.product.findMany({
            where: { ...(ctx.token?.userId ? { userId: ctx.token.userId } : {}), id: { in: args.productIds } },
            select: { id: true, name: true }
        });

        let head = args.head === "" ? "" : args.head + " ";
        let tail = args.tail === "" ? "" : " " + args.tail;
        
        await Promise.all(products.map(async v => {
            await ctx.prisma.product.update({
                where: { id: v.id },
                data: {
                    name: head + (args.body === "" ? v.name : args.body) + tail
                }
            });

            return 0;
        }))

        return "OK"
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductCategoryResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductCategoryByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        // const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
        // if (!category) return throwError(errors.etc("잘못된 카테고리입니다."), ctx);
        
        const result = args.productIds.map(async (id) => {
            const product = await ctx.prisma.product.findUnique({ where: { id: id }, include: { productStore: true } });
            
            if (!product) return;
    
            if (ctx.token?.userId && product.userId !== ctx.token.userId) {
                return;
            }

            let categoryInfo = {
                categoryA077: args.categoryA077,
                categoryB378: args.categoryB378,
                categoryA112: args.categoryA112,
                categoryA027: args.categoryA027,
                categoryA001: args.categoryA001,
                categoryA006: args.categoryA006,
                categoryB719: args.categoryB719,
                categoryA113: args.categoryA113,
                categoryA524: args.categoryA524,
                categoryA525: args.categoryA525,
                categoryB956: args.categoryB956,
            };

            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA077 && v.siteCode === "A077")) {
                categoryInfo.categoryA077 = product.categoryA077;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryB378 && v.siteCode === "B378")) {
                categoryInfo.categoryB378 = product.categoryB378;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA112 && v.siteCode === "A112")) {
                categoryInfo.categoryA112 = product.categoryA112;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA027 && v.siteCode === "A027")) {
                categoryInfo.categoryA027 = product.categoryA027;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA001 && v.siteCode === "A001")) {
                categoryInfo.categoryA001 = product.categoryA001;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA006 && v.siteCode === "A006")) {
                categoryInfo.categoryA006 = product.categoryA006;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryB719 && v.siteCode === "B719")) {
                categoryInfo.categoryB719 = product.categoryB719;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA113 && v.siteCode === "A113")) {
                categoryInfo.categoryA113 = product.categoryA113;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA524 && v.siteCode === "A524")) {
                categoryInfo.categoryA524 = product.categoryA524;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryA525 && v.siteCode === "A525")) {
                categoryInfo.categoryA525 = product.categoryA525;
            }
    
            if (product.productStore.find(v => v.state === 2 && categoryInfo.categoryB956 && v.siteCode === "B956")) {
                categoryInfo.categoryB956 = product.categoryB956;
            }

            await ctx.prisma.product.update({
                where: { 
                    id: id, 
                },
    
                data: { 
                    categoryA077: categoryInfo.categoryA077 ?? undefined,
                    categoryB378: categoryInfo.categoryB378 ?? undefined,
                    categoryA112: categoryInfo.categoryA112 ?? undefined,
                    categoryA027: categoryInfo.categoryA027 ?? undefined,
                    categoryA001: categoryInfo.categoryA001 ?? undefined,
                    categoryA006: categoryInfo.categoryA006 ?? undefined,
                    categoryB719: categoryInfo.categoryB719 ?? undefined,
                    categoryA113: categoryInfo.categoryA113 ?? undefined,
                    categoryA524: categoryInfo.categoryA524 ?? undefined,
                    categoryA525: categoryInfo.categoryA525 ?? undefined,
                    categoryB956: categoryInfo.categoryB956 ?? undefined,
                }
            });
        }).length;

        return result;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductSiilInfoResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductSiilInfoByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
        const result = await ctx.prisma.product.updateMany({ where: { userId: ctx.token!.userId, id: { in: args.productIds } }, data: { siilCode: args.siilCode } });
        return result.count;
    } catch (e) {
        return throwError(e, ctx);
    }
}
const deleteProductResolver = async (src: {}, args: ArgsValue<"Mutation", "deleteProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
       
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

        await Promise.all (
            args.productId.map(async(v:any) => {
            await deleteS3Folder(`product/${v}/`);
        }) 
        )

        await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: productStoreId } } });
        await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: productOptionNameId } } });
        await ctx.prisma.productStore.deleteMany({ where: { productId: { in: args.productId } } });
        await ctx.prisma.productOptionName.deleteMany({ where: { productId: {in : args.productId} } });
        await ctx.prisma.product.deleteMany({ where: { id: {in :args.productId} } });
        
        return true;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateProductSinglePriceResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductSinglePriceResolver">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const price = await ctx.prisma.product.update({
            where :{
                id : args.productId
            },
            data : {
                price : args.price
            }
        })
        if(!price) throwError(errors.etc("가격수정에 실패하였습니다."),ctx);
        return "OK"
    }catch(e){
        return throwError(e,ctx);
    }

}
const updateProductPriceResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductPriceByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const data = await ctx.prisma.userInfo.findUnique({
            where :{
                userId : ctx.token!.userId!
            }
        })
        if(!data) return throwError(errors.etc("no token"),ctx);
        const calculateWonType = parseInt(data.calculateWonType);

        const boundCalculatePrice = (cnyPrice: number, cnyRate: number, localShippingFee: number, calculateWonType :number) => calculatePrice.bind(null, cnyPrice, args.marginRate, args.marginUnitType, cnyRate, localShippingFee,calculateWonType)();

        const products = await ctx.prisma.product.findMany({
            where: { ...(ctx.token?.userId ? { userId: ctx.token.userId } : {}), id: { in: args.productIds } },
            select: { id: true, cnyRate: true, localShippingFee: true, localShippingCode: true, productOption: { select: { id: true, priceCny: true } }, taobaoProduct: { select: { price: true, originalData: true } } }
        });

       
            await Promise.all(products.map(async v => {
                let taobao = JSON.parse(v.taobaoProduct.originalData);
                
                let cnyRate = args.cnyRate;
                let localShippingFee = args.localShippingFee;
                let localShippingCode = args.localShippingCode;
                
    
    
                if (taobao.shop_id === "express" && !args.localShippingCode) {
                    cnyRate = v.cnyRate;
                    localShippingFee = v.localShippingFee;
                    localShippingCode = v.localShippingCode;
                }
    
                let test = [];
                let productMinprice =0;
                test = await Promise.all(v.productOption.map(async v => {
                    const result = await ctx.prisma.productOption.update({ 
                        where: { 
                            id: v.id 
                        }, 
                        
                        data: { 
                            price: boundCalculatePrice(v.priceCny, cnyRate, localShippingFee,calculateWonType),
                            defaultShippingFee: localShippingFee
                        }
                    });
                    return result.isActive ? result.price : 0
                }))
                console.log("test",test);
                let testZero = test.filter( (v :any)=> v  )
                if(testZero.length >0) productMinprice = Math.min(...testZero);
                console.log("productMinprice",productMinprice);
                await ctx.prisma.product.update({
                    where: { id: v.id },
                    data: {
                        price: productMinprice === 0 ? boundCalculatePrice(v.taobaoProduct.price, cnyRate, localShippingFee,calculateWonType) :productMinprice,
                        cnyRate: cnyRate,
                        marginRate: args.marginRate,
                        marginUnitType: args.marginUnitType,
                        shippingFee: args.shippingFee,
                        localShippingFee: localShippingFee,
                        localShippingCode: localShippingCode
                    }
                });
                return 0;
            }))
    
        return products.length;
    } catch (e) {
        return throwError(e, ctx);
    }
}


const TestupdateProductPriceResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductPriceByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const data = await ctx.prisma.userInfo.findUnique({
            where :{
                userId : ctx.token!.userId!
            }
        })
        if(!data) return throwError(errors.etc("no token"),ctx);
        const calculateWonType = parseInt(data.calculateWonType);

        const boundCalculatePrice = (cnyPrice: number, cnyRate: number, localShippingFee: number,calculateWonType :number) => calculatePrice.bind(null, cnyPrice, args.marginRate, args.marginUnitType, cnyRate, localShippingFee,calculateWonType)();

        const products = await ctx.prisma.product.findMany({
            where: { ...(ctx.token?.userId ? { userId: ctx.token.userId } : {}), id: { in: args.productIds } },
            select: { id: true, cnyRate: true, localShippingFee: true, localShippingCode: true, productOption: { select: { id: true, priceCny: true } }, taobaoProduct: { select: { price: true, originalData: true } } }
        });

        await Promise.all(products.map(async v => {
            let taobao = JSON.parse(v.taobaoProduct.originalData);
            
            let cnyRate = args.cnyRate;
            let localShippingFee = args.localShippingFee;
            let localShippingCode = args.localShippingCode;
            
            if (taobao.shop_id === "express" && !args.localShippingCode) {
                cnyRate = v.cnyRate;
                localShippingFee = v.localShippingFee;
                localShippingCode = v.localShippingCode;
            }

            await ctx.prisma.product.update({
                where: { id: v.id },
                data: {
                    price: boundCalculatePrice(v.taobaoProduct.price, cnyRate, localShippingFee,calculateWonType),
                    cnyRate: cnyRate,
                    marginRate: args.marginRate,
                    marginUnitType: args.marginUnitType,
                    shippingFee: args.shippingFee,
                    localShippingFee: localShippingFee,
                    localShippingCode: localShippingCode
                }
            });

            await Promise.all(v.productOption.map(async v => {
                await ctx.prisma.productOption.update({ 
                    where: { 
                        id: v.id 
                    }, 
                    
                    data: { 
                        price: boundCalculatePrice(v.priceCny, cnyRate, localShippingFee,calculateWonType),
                        defaultShippingFee: localShippingFee
                    }
                });
            }))
            return 0;
        }))

        return products.length;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductOption = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductOption">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        args.data.map(async (v :any)=>{
            await ctx.prisma.productOption.update({
                where :{ id : v.productOptionId},
                data : {
                    defaultShippingFee : v.defaultShippingFee ?? undefined,
                    price : v.price?? undefined,
                    stock : v.stock?? undefined,
                    isActive : v.isActive ?? undefined,
                }
            })
        })
        return "OK"
    }catch(e){
        return throwError(e,ctx);
    }
}
const restoreProductOptionValue = async (src: {}, args: ArgsValue<"Mutation", "restoreProductOptionValue">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        const findOrigin = await ctx.prisma.productOptionValue.findMany({
            where : {
                productOptionNameId : args.productOptionNameId
            }
        })
        
        const update = await Promise.all(findOrigin.map(async(x:any)=>{
            return await ctx.prisma.productOptionValue.update({
                where : { id:x.id},
                data : { name : x.originalName}
            })
        }))

        // console.log("update",update);
        return JSON.stringify(update);
    }catch(e){
        return throwError(e,ctx);
    }
}

const updateManyProductOptionValue = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductOptionValue">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        args.data.map(async (v:any) => {
            await ctx.prisma.productOptionValue.update({
                where : { id : v.productOptionValueId},
                data : {name : v.name ?? undefined}
            })
        })
        return "OK"
    }catch(e){
        return throwError(e,ctx);
    }
}
const endProductSellStateResolver = async (src: {}, args: ArgsValue<"Mutation", "endProductSellStateByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const products = await ctx.prisma.product.updateMany({ where: { userId: ctx.token!.userId, id: { in: args.productIds } }, data: { state: 10 } });
        return products.count;
    } catch (e) {
        return throwError(e, ctx);
    }
}
const updateProductFee = async (src: {}, args: ArgsValue<"Mutation", "updateProductFee">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        const product = await ctx.prisma.product.update({
            where : {
                id : args.productId
            },
            data : {
                naverFee :        args.naverFee ?? undefined  ,
                coupangFee :      args.coupangFee ?? undefined  ,
                streetFee :       args.streetFee ?? undefined  ,
                streetNormalFee : args.streetNormalFee ?? undefined,
                gmarketFee    :    args.gmarketFee  ?? undefined  ,
                auctionFee :      args.auctionFee  ?? undefined ,
                interparkFee   :   args.interparkFee ?? undefined,
                wemakepriceFee  :  args.wemakepriceFee ?? undefined,
                lotteonFee :      args.lotteonFee ?? undefined  ,
                lotteonNormalFee :args.lotteonNormalFee ?? undefined,
                tmonFee        :   args.tmonFee  ?? undefined,
            }
        })
        if(!product) return throwError(errors.etc("업데이트를 할수 없습니다"),ctx);
        return "OK"
    }catch(e){
        return throwError(e,ctx);
    }
}
const updateManyProductFee = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductFee">, ctx: Context, info: GraphQLResolveInfo) => {
    try{
        const product = await ctx.prisma.product.updateMany({
            where: { id: { in : args.productId } },
            data : {
                naverFee :        args.naverFee ?? undefined  ,
                coupangFee :      args.coupangFee ?? undefined  ,
                streetFee :       args.streetFee ?? undefined  ,
                streetNormalFee : args.streetNormalFee ?? undefined,
                gmarketFee    :    args.gmarketFee  ?? undefined  ,
                auctionFee :      args.auctionFee  ?? undefined ,
                interparkFee   :   args.interparkFee ?? undefined,
                wemakepriceFee  :  args.wemakepriceFee ?? undefined,
                lotteonFee :      args.lotteonFee ?? undefined  ,
                lotteonNormalFee :args.lotteonNormalFee ?? undefined,
                tmonFee        :   args.tmonFee  ?? undefined,
            }
        })
        if(!product) return throwError(errors.etc("업데이트를 할수 없습니다"),ctx);
        return "OK"
    }catch(e){
        return throwError(e,ctx);
    }
}
export async function copyProductsToUser(targetProductIds: number[], ctx: Context, userId: number) {
    const targetProducts = await ctx.prisma.product.findMany({
        where: { id: { in: targetProductIds } },
        include: {
            productOption: {
                include: { productOption1: true, productOption2: true, productOption3: true }
            },
            productOptionName: { include: { productOptionValue: true } },
            taobaoProduct: { select: { taobaoNumIid: true } }
        }
    });
    return await Promise.all(targetProducts.map(async (product) => {
        const { taobaoProduct, productOption, productOptionName, ...data } = product;
        let newProduct = await ctx.prisma.product.create({
            data: {
                ...data,
                state: 6,
                userId: userId,
                adminId: ctx.token!.adminId!,
                productCode: "",
                id: undefined,
                createdAt: new Date(),
                modifiedAt: new Date(),
                stockUpdatedAt: new Date(),
            }
        });
        newProduct = await ctx.prisma.product.update({ where: { id: newProduct.id }, data: { productCode: "SFYA_" + newProduct.id.toString(36) } });

        const newProductOptionName = await Promise.all(productOptionName.map(async (v) => {
            return await ctx.prisma.productOptionName.create({
                data: {
                    productId: newProduct.id,
                    order: v.order,
                    name: v.name,
                    taobaoPid: v.taobaoPid,
                    isNameTranslated: v.isNameTranslated,
                    hasImage: v.hasImage,
                    productOptionValue: {
                        createMany: {
                            data: v.productOptionValue.map(v => {
                                const { id, productOptionNameId, ...etc } = v;
                                return etc;
                            })
                        }
                    }
                },
                include: { productOptionValue: true }
            });
        }));

        await ctx.prisma.productOption.createMany({
            data: product.productOption.map(productOption => {
                const { productOption1, productOption2, productOption3, ...etc } = productOption;
                return {
                    ...etc,
                    id: undefined,
                    product_id: newProduct.id,
                    option_value1_id: newProductOptionName.find(v => v.order === 1)!.productOptionValue.find(v => v.taobaoVid === productOption.productOption1.taobaoVid)!.id,
                    option_value2_id: newProductOptionName.find(v => v.order === 2)?.productOptionValue.find(v => v.taobaoVid === productOption.productOption2?.taobaoVid)?.id ?? null,
                    option_value3_id: newProductOptionName.find(v => v.order === 3)?.productOptionValue.find(v => v.taobaoVid === productOption.productOption3?.taobaoVid)?.id ?? null,
                };
            })
        });
        return newProduct;
    }));
}

export const mutation_product = extendType({
    type: "Mutation",
    definition(t) {
        t.field("initProductThumbnailImageByUser", {
            type: "String",
            args: {
                productId: nonNull(intArg())
            },
            resolve: initProductThumbnailImageByUser
        });
        t.field("initProductOptionImageByUser", {
            type: "String",
            args: {
                productId: nonNull(intArg())
            },
            resolve: initProductOptionImageByUser
        });
        t.field("initProductDescriptionByUser", {
            type: "String",
            args: {
                productId: nonNull(intArg())
            },
            resolve: initProductDescriptionByUser
        });
        t.field("initProductImageByUser", {
            type: "String",
            args: {
                productId: nonNull(intArg())
            },
            resolve: initProductImageByUser
        });
        t.field("updateProductOptionShippingFee", {
            type: "String",
            args : {
                productOptionId : nonNull(intArg()),
                defaultShippingFee : nonNull(intArg())
            },
            resolve :updateProductOptionShippingFee 
        })
        t.field("updateProductImageBySomeone", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                description: stringArg(),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueImageUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailImageUpdateInput" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    // if (1) return throwError(errors.etc("작업중입니다."), ctx);
                    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
                    
                    if (!product) {
                        return throwError(errors.noSuchData, ctx);
                    }

                    // if (product.isImageTranslated) {
                    //     if (ctx.token?.userId) {
                    //         publishUserLogData(ctx, { type: "updateProductImage", title: `이미 번역된 상품입니다. (${product.productCode})` });
                    //     }

                    //     return throwError(errors.etc("이미 번역된 상품입니다."), ctx);
                    // }

                    if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
                    const productOptionValues = product.productOptionName.flatMap(v => v.productOptionValue);
                    if (args.optionValues.some(v => productOptionValues.findIndex(v2 => v2.id === v.id) === -1)) return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);

                    for (let v of args.optionValues) {
                        let image = v.image;
                        if (v.newImageBase64) {
                            const base64str = v.newImageBase64;
                            const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                            if (res) {
                                let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                                let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                                if (ext === 'jpeg') {
                                    ext = 'jpg';
                                }

                                image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${v.id}_.${ext}`, mimetype, ["product", product.id]);
                            }
                            else {
                                image = undefined;
                            }
                        }
                        await ctx.prisma.productOptionValue.update({ where: { id: v.id }, data: { image } });
                    }
                    let imageThumbnailData = product.imageThumbnailData;
                    if (args.thumbnails && args.thumbnails.length > 0) {
                        let imageArray: string[] = [];
                        for (let v of args.thumbnails) {
                            let image: string | undefined = v.defaultImage;
                            if (v.uploadImageBase64) {
                                const base64str = v.uploadImageBase64;
                                const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                                if (res) {
                                    let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                                    let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                                    if (ext === 'jpeg') {
                                        ext = 'jpg';
                                    }

                                    image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail.${ext}`, mimetype, ["product", product.id]);
                                }
                            }
                            //썸네일 https 수정
                            imageArray.push(image.replace(/^https?:/, "http:"));
                        }
                        imageThumbnailData = JSON.stringify(imageArray);
                    }

                    const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
                    const result = await ctx.prisma.product.update({
                        where: { id: product.id }, data: {
                            isImageTranslated: true,
                            description: description,
                            imageThumbnailData
                        }
                    });
                    if (ctx.token?.userId) {
                        publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
                    }
                    return result;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })

        t.field("updateProductImageBySomeone2", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                description: stringArg(),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueImageUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailImageUpdateInput" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    // if (1) return throwError(errors.etc("작업중입니다."), ctx);
                    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
                    
                    if (!product) {
                        return throwError(errors.noSuchData, ctx);
                    }

                    // if (product.isImageTranslated) {
                    //     if (ctx.token?.userId) {
                    //         publishUserLogData(ctx, { type: "updateProductImage", title: `이미 번역된 상품입니다. (${product.productCode})` });
                    //     }

                    //     return throwError(errors.etc("이미 번역된 상품입니다."), ctx);
                    // }

                    if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
                    const productOptionValues = product.productOptionName.flatMap(v => v.productOptionValue);
                    if (args.optionValues.some(v=> productOptionValues.findIndex(v2 => v2.id === v.id) === -1)) return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);
                    
                    interface Resultobject {
                        thumbnails : {
                            defaultImage : any,
                            newImage : any
                        }[],
                        productId : number,
                        description : string ,
                        optionValues : {
                            id : number,
                            defaultImage : any,
                            newImage : any
                        }[]
                    };

          
                    
                    const a1 = {
                        thumbnails : [],
                        productId : 0,
                        description : "",
                        optionValues : []
                    } as Resultobject ;

                    a1.productId = args.productId;
                    for (let [index,value] of args.optionValues.entries()) {
                        let image = value.image;
                        let defaultImage = image;
                        if (value.newImageBase64) {
                            const base64str = value.newImageBase64;
                            const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                            if (res) {
                                let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                                let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                                if (ext === 'jpeg') {
                                    ext = 'jpg';
                                }

                                image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${value.id}_.${ext}`, mimetype, ["product", product.id]);
                            
                                a1.optionValues.push({
                                            defaultImage : defaultImage,
                                            id : value.id,
                                            newImage : "https://img.sellforyou.co.kr/sellforyou/"+image
                                });

                            }
                            else {
                                image = undefined;
                                
                            }
                        }
                        await ctx.prisma.productOptionValue.update({ where: { id: value.id }, data: { image } });
                    }

                    let imageThumbnailData = product.imageThumbnailData;
                    if (args.thumbnails && args.thumbnails.length > 0) {
                        let imageArray: string[] = [];
                        for (let [index,v] of args.thumbnails.entries()) {
                            let image: string | undefined = v.defaultImage;
                            let defaultImage = image;
                            if (v.uploadImageBase64) {
                                const base64str = v.uploadImageBase64;
                                const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                                if (res) {
                                    let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                                    
                                    let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                                    if (ext === 'jpeg') {
                                        ext = 'jpg';
                                    }

                                    image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail.${ext}`, mimetype, ["product", product.id]);
                                    a1.thumbnails.push({
                                        defaultImage : defaultImage,
                                        newImage : "https://img.sellforyou.co.kr/sellforyou/"+image
                                    });
                                }
                            }
                            //썸네일 https 수정
                            imageArray.push(image.replace(/^https?:/, "http:"));
                        }
                        imageThumbnailData = JSON.stringify(imageArray);
                    }
                    const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
                    a1.description = description !== undefined ? "https://img.sellforyou.co.kr/sellforyou/"+description : "" ;
                    const result = await ctx.prisma.product.update({
                        where: { id: product.id }, data: {
                            isImageTranslated: true,
                            description: description,
                            imageThumbnailData
                        }
                    });
                    if (ctx.token?.userId) {
                        publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
                    }
                    return JSON.stringify(a1);

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })

        t.field("updateNewProductImageBySomeone", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                description: stringArg(),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueImageUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductNewThumbnailImageUpdateInput" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
                    
                    if (!product) {
                        return throwError(errors.noSuchData, ctx);
                    }

                    if (ctx.token?.userId && product.userId !== ctx.token.userId) {
                        return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
                    }

                    const productOptionValues = product.productOptionName.flatMap(v => v.productOptionValue);

                    if (args.optionValues.some((v: any) => productOptionValues.findIndex(v2 => v2.id === v.id) === -1)) {
                        return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);
                    }
                    
                    interface Resultobject {
                        productId : number,

                        thumbnails : {
                            index: number,
                            newImage: any
                        }[],
                        
                        optionValues : {
                            id : number,
                            newImage : any
                        }[],

                        description : string
                    };
                    
                    const a1 = {
                        thumbnails : [],
                        productId : 0,
                        description : "",
                        optionValues : []
                    } as Resultobject ;

                    a1.productId = args.productId;
                    
                    // thumbnail
                    let imageThumbnailData = JSON.parse(product.imageThumbnailData);

                    let thumbnails = await Promise.all(imageThumbnailData.map(async (v: any, i: number) => {
                        if (!args.thumbnails || args.thumbnails.length < 1) {
                            return v;
                        }

                        const matched = args.thumbnails.find((w: any) => w.index === i)

                        if (!matched || !matched.uploadImageBase64) {
                            return v;
                        }

                        const res = matched.uploadImageBase64.match(/data:(image\/.*?);base64,(.*)/);

                        if (!res) {
                            return v;
                        }
                        
                        let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                        let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                        if (ext === 'jpeg') {
                            ext = 'jpg';
                        }

                        const image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail${(i + 1).toString().padStart(2, '0')}.${ext}`, mimetype, ["product", product.id]);

                        a1.thumbnails.push({
                            index: i,
                            newImage: "https://img.sellforyou.co.kr/sellforyou/" + image
                        });

                        return image;
                    }));

                    // option
                    if (args.optionValues.length > 0) {
                        a1.optionValues = await Promise.all(productOptionValues.map(async (v: any, i: number) => {
                            const matched = args.optionValues.find((w: any) => w.id === v.id);
    
                            if (!matched || !matched.newImageBase64) {
                                return {
                                    id: v.id,
                                    newImage: null
                                };
                            }

                            const res = matched.newImageBase64.match(/data:(image\/.*?);base64,(.*)/);

                            if (!res) {
                                return {
                                    id: v.id,
                                    newImage: null
                                };
                            }

                            let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                            
                            let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                            if (ext === 'jpeg') {
                                ext = 'jpg';
                            }

                            const image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${matched.id}_${(i + 1).toString().padStart(2, '0')}.${ext}`, mimetype, ["product", product.id]);
                            
                            await ctx.prisma.productOptionValue.update({ 
                                where: { 
                                    id: matched.id 
                                },

                                data: { 
                                    image 
                                } 
                            });

                            return {
                                id: v.id,
                                newImage: "https://img.sellforyou.co.kr/sellforyou/" + image
                            }
                        }));
                    }

                    // description
                    const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;

                    a1.description = description ? "https://img.sellforyou.co.kr/sellforyou/" + description : "";

                    // update
                    const result = await ctx.prisma.product.update({
                        where: { 
                            id: product.id 
                        }, 

                        data: {
                            isImageTranslated: true,
                            imageThumbnailData: JSON.stringify(thumbnails),
                            description
                        }
                    });

                    if (ctx.token?.userId) {
                        publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
                    }

                    return JSON.stringify(a1);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("testAddjobCallBack",{
            type : nonNull("Boolean"),
            args: {
                response : nonNull(stringArg())
            },
            resolve : async (src,args, ctx, info) => {
                try{
                    let response = JSON.parse(args.response);
                    const result = response.results["result.json"];
                    result.map((v : any,i : any,a : any)=> a[i].setdata = '_생략_');

                    const results = await Promise.all(result.map(async (v :any)=> {
                       
                        const name = v.code.split('_');
                        const productId = parseInt(name[1], 36);
                        const product = await ctx.prisma.product.findUnique({
                            where: { id: productId },
                            include: {
                                productStore: {
                                    orderBy: [{ id: "desc" }],
                                },
                                user: { select: { userInfo: { select: { naverStoreUrl: true } } } }
                            }
                        });
                        if (!product) {
                            return throwError(errors.etc("addJob 정보 없음"),ctx);
                            }
                            //test
                        const productStore = product.productStore.find(v2 => v2.siteCode === v.site_code);
                        if (!productStore) {
                            if (v.state !== 1 && v.state !== 2) {
                                return throwError(errors.etc("addJob 콜백 : state가 1,2가 아님"),ctx);
                            }
                            const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : { connect: { id: ProductStoreStateEnum.REGISTER_FAILED } };
                            const etcVendorItemId = v.site_code === 'B378' ? v.slave_reg_code_sub : undefined;
                            const updatedResult = await ctx.prisma.productStore.create({
                                data: {
                                    storeProductId: v.slave_reg_code !== '' ? v.slave_reg_code : undefined,
                                    productStoreState:productStoreState,
                                    productStoreLog: v.state === 2 ? {
                                        create: {
                                            jobId: response.job_id,
                                            destState: ProductStoreStateEnum.ON_SELL,
                                            uploadState: v.state,
                                            errorMessage: v.msg,
                                        }
                                    } : undefined,
                                    product: { connect: { id: product.id } },
                                    etcVendorItemId : etcVendorItemId,
                                    storeUrl:  v.slave_reg_code !== '' ? shopDataUrlInfo[v.site_code]({ id: v.slave_reg_code, storeFullPath: product.user?.userInfo?.naverStoreUrl, vendorId: etcVendorItemId }) : undefined,
                                    siteCode: v.site_code,
                                    user: { connect: { id: product.userId! } },
                                }
                            })
                            await ctx.prisma.product.update({
                                where: { id: updatedResult.productId }, data: {
                                    //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                                    state : v.state === 1 ? 7 : undefined,
                                    stockUpdatedAt : v.state ===1? new Date() : undefined ,
                                }
                            })
                            return { userId: product.userId, productId: product.id, reason: v.msg, state: v.state, storeUrl : v.slave_reg_code };
                            }
                            else {
                            const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } }  : undefined;
                            const etcVendorItemId = v.site_code === 'B378' ? v.slave_reg_code_sub : undefined;
                            const updatedResult = await ctx.prisma.productStore.update({
                                where: { id: productStore.id },
                                data: {
                                    storeProductId:  v.state !== 2 ?  v.slave_reg_code !== '' ? v.slave_reg_code : undefined : undefined,
                                    productStoreState : productStoreState,
                                    productStoreLog: v.state === 2 ? {
                                        create: {
                                            jobId: response.job_id,
                                            destState: ProductStoreStateEnum.ON_SELL,
                                            uploadState: v.state,
                                            errorMessage: v.msg,
                                        }
                                    } : {
                                        deleteMany : {
                                        productStoreId : productStore.id
                                        }
                                    } ,
                                    product: { connect: { id: product.id } },
                                    etcVendorItemId : etcVendorItemId,
                                    storeUrl: v.state !== 2 ?  v.slave_reg_code !== '' ? shopDataUrlInfo[v.site_code]({ id: v.slave_reg_code, storeFullPath: product.user?.userInfo?.naverStoreUrl, vendorId: etcVendorItemId }) : undefined : undefined,
                                    siteCode: v.site_code,
                                    user: { connect: { id: product.userId! } },
                                }
                            })
                            await ctx.prisma.product.update({
                                where: { id: updatedResult.productId }, data: {
                                    //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                                    state : v.state === 1 ? 7 : undefined,
                                    stockUpdatedAt : v.state ===1 ? new Date() : undefined ,
                                }
                            })
                        }
                        return  { userId: product.userId, productId: product.id, reason: v.msg, state: v.state, storeUrl : v.slave_reg_code };
                    }))
                    console.log("상품등록 결과",results);
                return true;
                }
                catch(e){
                    return throwError(e,ctx);
                }
            }
        })
        t.field("updateProductAttributeByUser",{
            type: nonNull("String"),
            args: {
                productId : nonNull(intArg()),
                brandName : stringArg(),
                manufacturer : stringArg(),
                modelName : stringArg(),
            },
            resolve : async (src, args, ctx, info) =>{
                try{
                    const update = await ctx.prisma.product.update({
                        where : { id : args.productId} ,
                        data : {
                            brandName : args.brandName ?? undefined,
                            manuFacturer : args.manufacturer ?? undefined,
                            modelName : args.modelName ?? undefined
                        }
                    })
                    if(!update) return throwError(errors.etc("Fail to update Attribute"),ctx);
                    return "Success"
                }catch(e) {
                    return throwError(e,ctx);
                }
            }
        })
        t.field("updateProductByUser", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: stringArg(),
                price: intArg(),
                description: stringArg(),
                localShippingFee: intArg(),
                localShippingCode: intArg(),
                shippingFee: intArg(),
                options: nonNull(list(nonNull(arg({ type: "ProductOptionUpdateInput" })))),
                optionNames: nonNull(list(nonNull(arg({ type: "ProductOptionNameUpdateInput" })))),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
                categoryCode: stringArg(),
                categoryA077: stringArg(),
                categoryB378: stringArg(),
                categoryA112: stringArg(),
                categoryA027: stringArg(),
                categoryA001: stringArg(),
                categoryA006: stringArg(),
                categoryB719: stringArg(),
                categoryA113: stringArg(),
                categoryA524: stringArg(),
                categoryA525: stringArg(),
                categoryB956: stringArg(),
                siilCode: stringArg(),
                siilData: list(nonNull(arg({ type: "SiilInput" }))),
            },
            resolve: updateProductResolver
        })
        t.field("updateDescription",{
            type: nonNull("String"),
            args : {
                productId: nonNull(intArg()),
                description: nonNull(stringArg()),
            },
            resolve : updateDescription
        })
        t.field("updateProductFee",{
            type : nonNull("String"),
            args: {
                productId : nonNull(intArg()),
                naverFee :  floatArg(),
                coupangFee :  floatArg(),
                streetFee :  floatArg(),
                streetNormalFee  :  floatArg(),
                gmarketFee   :  floatArg(),
                auctionFee :  floatArg(),
                interparkFee  :  floatArg(),
                wemakepriceFee  :  floatArg(),
                lotteonFee :  floatArg(),
                lotteonNormalFee :  floatArg(),
                tmonFee  :  floatArg(),                
            },
            resolve : updateProductFee
        })
        t.field("updateManyProductFee",{
            type : nonNull("String"),
            args: {
                productId : nonNull(list(nonNull(intArg()))),
                naverFee :  floatArg(),
                coupangFee :  floatArg(),
                streetFee :  floatArg(),
                streetNormalFee  :  floatArg(),
                gmarketFee   :  floatArg(),
                auctionFee :  floatArg(),
                interparkFee  :  floatArg(),
                wemakepriceFee  :  floatArg(),
                lotteonFee :  floatArg(),
                lotteonNormalFee :  floatArg(),
                tmonFee  :  floatArg(),                
            },
            resolve : updateManyProductFee
        })
        t.field("updateProductCategory",{
            type:nonNull("String"),
            args:{
                productId: nonNull(intArg()),
                categoryCode: stringArg(),
                categoryA077: stringArg(),
                categoryB378: stringArg(),
                categoryA112: stringArg(),
                categoryA027: stringArg(),
                categoryA001: stringArg(),
                categoryA006: stringArg(),
                categoryB719: stringArg(),
                categoryA113: stringArg(),
                categoryA524: stringArg(),
                categoryA525: stringArg(),
                categoryB956: stringArg(),
            },
            resolve : updateProductCategory
        })
        t.field("updateProductNameByUser", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            resolve: updateProductNameResolver
        })
        t.field("updateMultipleProductNameByUser", {
            type: nonNull("String"),
            args: {
                data : nonNull(list(nonNull(arg({type : "ProductOptionNameInput"}))))
        },
            resolve: updateMultipleProductNameByUser
        })
        t.field("updateManyProductTagByUser", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                searchTags: stringArg(),
                immSearchTags: stringArg(),
            },
            resolve: updateManyProductTagResolver
        })
        t.field("updateProductTagByUser", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                searchTags: stringArg(),
                immSearchTags: stringArg(),
            },
            resolve: updateProductTagResolver
        })
        t.field("updateManyProductNameByUser", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                head: stringArg(),
                body: stringArg(),
                tail: stringArg()
            },
            resolve: updateManyProductNameResolver
        })
        t.field("updateManyProductCategoryByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                categoryA077: stringArg(),
                categoryB378: stringArg(),
                categoryA112: stringArg(),
                categoryA027: stringArg(),
                categoryA001: stringArg(),
                categoryA006: stringArg(),
                categoryB719: stringArg(),
                categoryA113: stringArg(),
                categoryA524: stringArg(),
                categoryA525: stringArg(),
                categoryB956: stringArg(),
                
            },
            resolve: updateManyProductCategoryResolver
        })
        t.field("updateManyProductSiilInfoByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                siilCode: nonNull(stringArg()),
            },
            resolve: updateManyProductSiilInfoResolver
        })
        t.field("deleteProductByUser", {
            type: nonNull("Boolean"),
            args: {
                productId: nonNull(list(nonNull(intArg())))
            },
            resolve: deleteProductResolver
        })
        t.field("updateProductPriceByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                cnyRate: nonNull(floatArg()),
                marginRate: nonNull(floatArg()),
                marginUnitType: nonNull(stringArg()),
                shippingFee: nonNull(intArg({ description: "유료배송비" })),
                localShippingFee: nonNull(intArg({ description: "해외배송비(배대지배송비)" })),
                localShippingCode: intArg()
            },
            resolve: updateProductPriceResolver
        })
        t.field("updateProductSinglePriceByUser", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                price : nonNull(intArg())
            },
            resolve: updateProductSinglePriceResolver
        })
        t.field("endProductSellStateByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg())))
            },
            resolve: endProductSellStateResolver
        })
        ////////////////////////////////////
        t.field("updateProductByAdmin", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: stringArg(),
                price: intArg(),
                description: stringArg(),
                localShippingFee: intArg(),
                shippingFee: intArg(),
                options: nonNull(list(nonNull(arg({ type: "ProductOptionUpdateInput" })))),
                optionNames: nonNull(list(nonNull(arg({ type: "ProductOptionNameUpdateInput" })))),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
                categoryCode: stringArg(),
                siilCode: stringArg(),
                siilData: list(nonNull(arg({ type: "SiilInput" }))),
            },
            resolve: updateProductResolver
        })
        t.field("updateProductOption",{
            type: nonNull(list(nonNull("Int"))),
            args: {
                id : nonNull(intArg()),
                productOption : nonNull(list(nonNull(arg({type : "setProductOption"}))))
            },
            resolve : updateProductOptionResolver
        })
        t.field("updateProductNameByAdmin", {
            type: nonNull("String"),
            args: {
                productId: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            resolve: updateProductNameResolver
        })
        t.field("updateManyProductCategoryByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                categoryA077: stringArg(),
                categoryB378: stringArg(),
                categoryA112: stringArg(),
                categoryA027: stringArg(),
                categoryA001: stringArg(),
                categoryA006: stringArg(),
            },
            resolve: updateManyProductCategoryResolver
        })
        t.field("updateManyProductSiilInfoByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                siilCode: nonNull(stringArg()),
            },
            resolve: updateManyProductSiilInfoResolver
        })
        t.field("deleteProductByAdmin", {
            type: nonNull("Boolean"),
            args: {
                productId: nonNull(list(nonNull(intArg())))
            },
            resolve: deleteProductResolver
        })
        t.field("updateProductPriceByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                cnyRate: nonNull(floatArg()),
                marginRate: nonNull(floatArg()),
                marginUnitType: nonNull(stringArg()),
                shippingFee: nonNull(intArg({ description: "유료배송비" })),
                localShippingFee: nonNull(intArg({ description: "해외배송비(배대지배송비)" })),
                localShippingCode: intArg()
            },
            resolve: updateProductPriceResolver
        })
        t.field("endProductSellStateByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg())))
            },
            resolve: endProductSellStateResolver
        })
        t.field("transferProductsToUserByAdmin", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                targetUserId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.findUnique({ where: { id: args.targetUserId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    else if (user.state !== 'ACTIVE') return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    const targetProducts = await ctx.prisma.product.findMany({
                        where: { id: { in: args.productIds }, userId: { equals: null } },
                        select: { id: true, taobaoProductId: true }
                    });
                    const userId = user.id;
                    const existingProducts = await ctx.prisma.product.findMany({
                        where: {
                            userId: { equals: userId },
                            taobaoProductId: { in: targetProducts.map(v => v.taobaoProductId) }
                        },
                        select: { taobaoProductId: true }
                    });
                    const filteredTargetProducts = targetProducts.filter(v => existingProducts.findIndex(v2 => v2.taobaoProductId === v.taobaoProductId) === -1);

                    if (targetProducts.length > 0 && filteredTargetProducts.length === 0) return throwError(errors.etc("모든 상품이 해당 유저에 수집된 상품이거나, 관리자 상품이 아닙니다."), ctx);
                    const newProduct = await copyProductsToUser(filteredTargetProducts.map(v => v.id), ctx, userId)

                    return `${newProduct.length}개의 상품이 ${user.email} 유저 계정에 추가되었습니다.`

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("setProductOptionValueBySomeOne", {
            type: nonNull("String"),
            args: {
                productOptionNameId: intArg(),
                productOptionValueId: intArg(),
                isActive: nonNull(booleanArg()),
                name:stringArg(),
                image : stringArg(),
                newImage : arg({ type: "Upload" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if(args.productOptionValueId){
                        //todoconsole.log("옵션 각개 활성화");
                    const productOptionValue = await ctx.prisma.productOptionValue.findUnique({
                        where: { id: args.productOptionValueId },// 컬럼이아니라 각 하나하나의 id들 
                        select: { id: true, productOptionName: { select: { product: { select: { userId: true,id : true } } } } }//option_value_id랑 product의 userId를 select해옴 
                    });
                    if (!productOptionValue) return throwError(errors.etc("해당 옵션이 없습니다."), ctx);
                    let returnImage = "true";
                    let image = args.image ?? undefined;
                    if(args.newImage){
                           image = await uploadToS3AvoidDuplicate(args.newImage , ["product", productOptionValue.productOptionName.product.id]);
                           returnImage = "https://img.sellforyou.co.kr/sellforyou/"+image;
                    }

                    if (ctx.token?.userId && productOptionValue?.productOptionName.product.userId !== ctx.token.userId) return throwError(errors.etc("권한이 없습니다."), ctx);
                    
                    await ctx.prisma.productOptionValue.update({
                        where: { id: productOptionValue.id },
                        data: args.name ? { isActive: args.isActive, name: args.name.trim(),image  } :  { isActive: args.isActive, image }
                    })

                    return returnImage;
                }
                    else if(args.productOptionNameId){
                        console.log("옵션 전면 활성화");
                        const productOptionName = await ctx.prisma.productOptionName.findUnique({
                            where : {id : args.productOptionNameId},
                            select : { id : true , product : {select : {userId : true,id: true}}}
                        });
                        if(!productOptionName) return throwError(errors.etc("해당 옵션이름이 없습니다."),ctx);
                        if (ctx.token?.userId && productOptionName?.product.userId !== ctx.token.userId) return throwError(errors.etc("권한이 없습니다."), ctx);
                        await ctx.prisma.productOptionValue.updateMany({
                            where: { productOptionNameId: productOptionName.id },
                            data: { isActive: args.isActive }
                        })
                        return "true";
                    }
                    else {
                        return throwError(errors.etc("옵션 네임 id 혹은 옵션 id 필수값입니다."),ctx);
                    }
                
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("setProductOptionNameBySomeOne", {
            type: nonNull("Boolean"),
            args: {
                productOptionNameId: nonNull(intArg()),
                isActive: nonNull(booleanArg()),
                name : nonNull(stringArg())
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const productOptionName = await ctx.prisma.productOptionName.findUnique({
                        where: { id: args.productOptionNameId },// 컬럼이아니라 각 하나하나의 id들 
                        select: { id: true,product: { select: {  userId: true } } }//option_value_id랑 product의 userId를 select해옴 
                    });
                    
                    if (!productOptionName) return throwError(errors.etc("해당 옵션 카테고리가 없습니다."), ctx);
                    if (ctx.token?.userId && productOptionName?.product.userId !== ctx.token.userId) return throwError(errors.etc("권한이 없습니다."), ctx);
                    
                    const OptionName = await ctx.prisma.productOptionName.update({
                        where: { id: productOptionName.id },
                        data: { isActive: args.isActive, name : args.name.trim() }
                    })
                    if (!OptionName) return throwError(errors.etc("옵션 네임을 업데이트 하지 못했습니다."), ctx);

                    // const optionValue = await ctx.prisma.productOptionValue.updateMany({
                    //     where : {
                    //         productOptionNameId : args.productOptionNameId
                    //     },
                    //     data : {
                    //         isActive : args.isActive
                    //     }
                    // })
                    // if (!optionValue) return throwError(errors.etc("하위 옵션을 업데이트 하지 못했습니다."), ctx);
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("getProductListAllKeys",{
            type: nonNull("Boolean"),
            resolve : async (src,args,ctx,info) => {
                try{
                    const test = await getProductListAllKeys('product/');
                    if(!test) return throwError(errors.etc("product가 존재하지 않습니다."),ctx);
                    return true;
                }catch(e){
                    return throwError(e, ctx);
                }
            }
        })
        t.field("updateImageThumbnailData",{
            type : nonNull("String"),
            args : {
                productId : nonNull(intArg()),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
            },
            resolve : updateImageThumbnailData
        })
        t.field("updateManyProductOption",{
            type: nonNull("String"),
            args :  {
                data : nonNull(list(nonNull(arg({type : "ProductOptionInput"}))))
            },
            resolve : updateManyProductOption
        })
        t.field("updateManyProductOptionValue",{
            type: nonNull("String"),
            args :  {
                data : nonNull(list(nonNull(arg({type : "ProductOptionValueInput"}))))
            },
            resolve : updateManyProductOptionValue
        })
        t.field("restoreProductOptionValue",{
            type : nonNull("String"),
            args : {
                productOptionNameId : nonNull(intArg()),
            },
            resolve : restoreProductOptionValue
        })
        t.field("disableUserOption", {
            type: nonNull("Boolean"),
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const productOptionName = await ctx.prisma.productOptionName.findUnique({
                        where: { id: args.id }
                    });

                    if (!productOptionName) {
                        return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
                    }

                    const productOptionValue = await ctx.prisma.productOptionValue.findMany({ where: { productOptionNameId: productOptionName.id } });

                    const optionValueIds = productOptionValue.map((v) => {
                        return v.id;
                    })

                    await ctx.prisma.productOption.deleteMany({
                        where: {
                            productId: productOptionName.productId,
                            optionValue1Id: productOptionName.order === 1 ? { not: optionValueIds[0] } : undefined,
                            optionValue2Id: productOptionName.order === 2 ? { not: optionValueIds[0] } : undefined,
                            optionValue3Id: productOptionName.order === 3 ? { not: optionValueIds[0] } : undefined,
                        }
                    });

                    const productOption = await ctx.prisma.productOption.findMany({
                        where: {
                            productId: productOptionName.productId,
                            optionValue1Id: productOptionName.order === 1 ? { in: optionValueIds } : undefined,
                            optionValue2Id: productOptionName.order === 2 ? { in: optionValueIds } : undefined,
                            optionValue3Id: productOptionName.order === 3 ? { in: optionValueIds } : undefined,
                        }
                    });

                    await Promise.all(productOption.map(async (v) => {
                        if (v.optionValue1Id && !v.optionValue2Id && !v.optionValue3Id) {
                            await ctx.prisma.productOption.delete({
                                where: {
                                    id: v.id
                                }
                            });
                        } else {
                            await ctx.prisma.productOption.update({
                                where: {
                                    id: v.id
                                },

                                data: {
                                    optionValue1Id: productOptionName.order === 1 ? v.optionValue2Id ?? 0 : undefined,
                                    optionValue2Id: productOptionName.order === 1 || productOptionName.order === 2 ? v.optionValue3Id ?? null : undefined,
                                    optionValue3Id: null
                                }
                            });
                        }
                    }));

                    for (let i = productOptionName.order; i < 3; i++) {
                        await ctx.prisma.productOptionName.updateMany({
                            where: {
                                productId: productOptionName.productId,
                                order: i + 1
                            },
    
                            data: {
                                order: i
                            }
                        });

                        await ctx.prisma.productOptionValue.updateMany({
                            where: {
                                productOptionNameId: productOptionName.id,
                                optionNameOrder: i + 1
                            },
    
                            data: {
                                optionNameOrder: i
                            }
                        });
                    }

                    await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: productOptionName.id } });
                    await ctx.prisma.productOptionName.delete({ where: { id: productOptionName.id } });

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});