//taobao_product/mutation.ts
import { Prisma, Product, TaobaoProduct } from "@prisma/client";
import { add, isAfter, isBefore, sub } from "date-fns";
import { arg, extendType, floatArg, intArg, list, nonNull, stringArg } from "nexus";
import fetch from "node-fetch";
import { siilInfo } from "../siil";
import { IOBItem, IOBItemGetParam, IOBItemGetResponse, IOBItemSearchParam, IOBItemSearchResponse } from "../../onebound_api_types";
import { errors, throwError } from "../../utils/error";
import { getFromS3, uploadToS3ByBuffer } from "../../utils/file_manage";
import { wait } from "../../utils/helpers";
import { getItemAndSave, getOBFetchUrl, IFeeInfo, publicParam, saveTaobaoItemToUser } from "../../utils/local/onebound";
import Excel from "exceljs";
import { FileUpload } from "graphql-upload";
import { Context } from "../../types";
import { GraphQLResolveInfo } from "graphql";
import * as util from 'util'
import { ITranslateData } from "../../translate_types";
import { publishUserLogData } from "../../utils/local/pubsub";
// import { EXTERNAL_ADDRESS } from "../utils/constants";

// interface IGetTaobaoItemUsingExcelFileArgs {
//     categoryCode?: string | null;
//     data: FileUpload;
//     siilCode?: string | null;
// }
// interface IGetTaobaoItemUsingNumIidsArgs {
//     categoryCode?: string | null;
//     siilCode?: string | null;
//     taobaoIds: string[];
// }
// interface IGetTaobaoItemsArgs {
//     categoryCode?: string | null;
//     endPrice?: number | null;
//     orderBy: "_credit" | "_sale";
//     page: number | null;
//     pageCount: number | null;
//     query: string;
//     siilCode?: string | null;
//     startPrice?: number | null;
// }

// const getTaobaoItemUsingExcelFileResolver = (isAdmin: boolean) => async (src: {}, args: IGetTaobaoItemUsingExcelFileArgs, ctx: Context, info: GraphQLResolveInfo) => {
//     try {
//         if (args.siilCode) {
//             if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("????????? ???????????????????????????."), ctx);
//         }
//         if (args.categoryCode) {
//             // const splitedCode = args.categoryCode.split("_");
//             // if (splitedCode.length !== 4 || splitedCode.some(v => v.length !== 2)) return throwError(errors.etc("????????? ???????????????."), ctx);
//             const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
//             if (!category) return throwError(errors.etc("????????? ?????????????????????."), ctx);
//         }

//         const file = await args.data;
//         if (!file.mimetype.includes("spreadsheet")) return throwError(errors.etc("?????? ????????? ????????? ????????????."), ctx);
//         const workbook = new Excel.Workbook();
//         await workbook.xlsx.read(file.createReadStream());
//         const dailyMissionSheet = workbook.worksheets[0];
//         const data: string[] = [];
//         try {
//             dailyMissionSheet.eachRow((r, i) => {
//                 if (i === 1) return;
//                 let cell = r.getCell(1);
//                 data.push(cell.text);
//             });
//         }
//         catch (e) {
//             throw e;
//         }

//         let taobaoIids = data.reduce((p, c) => {
//             if (/^\d+$/.test(c)) {
//                 return [...p, c];
//             }
//             else if (/[?&]id=([0-9]+)/.test(c)) {
//                 return [...p, c.match(/[?&]id=([0-9]+)/)![1]];
//             }
//             return p;
//         }, [] as string[])

//         const ctx2 = ctx;
//         let isRestricted = false;
//         if (!ctx.token?.adminId && (!ctx.token?.level || ctx.token.level.level === 0)) {
//             let result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_DAY_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserDayLimit = parseInt(result.value);
//             // const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true } })
//             const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true, userInfo: { select: { productCollectCount: true } } } })
//             if (isAfter(new Date(), add(user!.createdAt, { days: freeUserDayLimit }))) return throwError(errors.etc("????????????????????? ???????????????."), ctx);


//             result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_PRODUCT_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserProductLimit = parseInt(result.value);

//             // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//             const productCount = user!.userInfo!.productCollectCount;
//             if (productCount >= freeUserProductLimit) return throwError(errors.etc("?????? ???????????? ?????????????????????."), ctx);
//             taobaoIids = taobaoIids.slice(0, freeUserProductLimit - productCount);
//             isRestricted = true;
//         }
//         if (ctx.token?.userId) {
//             // const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { maxProductLimit: true } });
//             const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { productCollectCount: true, maxProductLimit: true } });
//             if (!userInfo) return throwError(errors.noSuchData, ctx);
//             if (userInfo.maxProductLimit) {
//                 // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//                 const productCount = userInfo.productCollectCount;
//                 if (productCount >= userInfo.maxProductLimit) return throwError(errors.etc("?????? ????????? ?????? ?????? ???????????? ?????????????????????."), ctx);
//                 taobaoIids = taobaoIids.slice(0, userInfo.maxProductLimit - productCount);
//             }
//         }
//         getItemAndSave(ctx2, taobaoIids, { categoryCode: args.categoryCode ?? undefined, siilCode: args.siilCode ?? undefined, isRestricted, isAdmin }).then(() => { console.log("getTaobaoItemUsingNumIidsByUser done.") });

//         // ??????
//         return taobaoIids.length;
//     } catch (e) {
//         return throwError(e, ctx);
//     }
// }

// const getTaobaoItemUsingNumIidsResolver = (isAdmin: boolean) => async (src: {}, args: IGetTaobaoItemUsingNumIidsArgs, ctx: Context, info: GraphQLResolveInfo) => {
//     try {
//         let taobaoIids = args.taobaoIds.reduce((p, c) => {
//             if (/^\d+$/.test(c)) {
//                 return [...p, c];
//             }
//             else if (/[?&]id=([0-9]+)/.test(c)) {
//                 return [...p, c.match(/[?&]id=([0-9]+)/)![1]];
//             }
//             return p;
//         }, [] as string[])
//         if (args.siilCode) {
//             if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("????????? ???????????????????????????."), ctx);
//         }
//         if (args.categoryCode) {
//             // const splitedCode = args.categoryCode.split("_");
//             // if (splitedCode.length !== 4 || splitedCode.some(v => v.length !== 2)) return throwError(errors.etc("????????? ???????????????."), ctx);
//             const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
//             if (!category) return throwError(errors.etc("????????? ?????????????????????."), ctx);
//         }

//         const ctx2 = ctx;
//         let isRestricted = false;
//         if (!ctx.token?.adminId && (!ctx.token?.level || ctx.token.level.level === 0)) {
//             let result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_DAY_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserDayLimit = parseInt(result.value);
//             // const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true } })
//             const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true, userInfo: { select: { productCollectCount: true } } } })
//             if (isAfter(new Date(), add(user!.createdAt, { days: freeUserDayLimit }))) return throwError(errors.etc("????????????????????? ???????????????."), ctx);


//             result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_PRODUCT_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserProductLimit = parseInt(result.value);

//             // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//             const productCount = user!.userInfo!.productCollectCount;
//             if (productCount >= freeUserProductLimit) return throwError(errors.etc("?????? ???????????? ?????????????????????."), ctx);
//             taobaoIids = taobaoIids.slice(0, freeUserProductLimit - productCount);
//             isRestricted = true;
//         }
//         if (ctx.token?.userId) {
//             // const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { maxProductLimit: true } });
//             const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { productCollectCount: true, maxProductLimit: true } });
//             if (!userInfo) return throwError(errors.noSuchData, ctx);
//             if (userInfo.maxProductLimit) {
//                 // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//                 const productCount = userInfo.productCollectCount;
//                 if (productCount >= userInfo.maxProductLimit) return throwError(errors.etc("?????? ????????? ?????? ?????? ???????????? ?????????????????????."), ctx);
//                 taobaoIids = taobaoIids.slice(0, userInfo.maxProductLimit - productCount);
//             }
//         }
//         getItemAndSave(ctx2, taobaoIids, { categoryCode: args.categoryCode ?? undefined, siilCode: args.siilCode ?? undefined, isRestricted, isAdmin }).then(() => { console.log("getTaobaoItemUsingNumIidsByUser done.") });

//         // ??????
//         return taobaoIids.length;
//     } catch (e) {
//         return throwError(e, ctx);
//     }
// }

// const getTaobaoItemsResolver = (isAdmin: boolean) => async (src: {}, args: IGetTaobaoItemsArgs, ctx: Context, info: GraphQLResolveInfo) => {
//     try {
//         // ???????????? ?????? ????????????
//         let taobaoIids: string[] = [];
//         args.page = args.page ?? 1;
//         args.pageCount = args.pageCount ?? 1;
//         if (args.page < 1) return throwError(errors.etc("page??? 1 ???????????????."), ctx);
//         if (args.pageCount < 1) return throwError(errors.etc("pageCount??? 1 ???????????????."), ctx);
//         if (args.siilCode) {
//             if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("????????? ???????????????????????????."), ctx);
//         }
//         if (args.categoryCode) {
//             // const splitedCode = args.categoryCode.split("_");
//             // if (splitedCode.length !== 4 || splitedCode.some(v => v.length !== 2)) return throwError(errors.etc("????????? ???????????????."), ctx);
//             const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
//             if (!category) return throwError(errors.etc("????????? ?????????????????????."), ctx);
//         }

//         for (let i = args.page; i < args.page + args.pageCount; ++i) {
//             let params: IOBItemSearchParam = { ...publicParam, q: args.query, sort: args.orderBy, page: i, start_price: args.startPrice?.toString() ?? undefined, end_price: args.endPrice?.toString() ?? undefined };
//             if (params.start_price === '0') params.start_price = undefined;
//             if (params.end_price === '0') params.end_price = undefined;
//             const taobaoItemSearchResult = await fetch(getOBFetchUrl<IOBItemSearchParam>("item_search", params)).then(res => res.json()) as IOBItemSearchResponse;
//             if (taobaoItemSearchResult.error !== "") {
//                 const errorInfo = (({ error, error_code, reason, request_id }) => ({ error, error_code, reason, request_id, time: new Date().toLocaleString() }))(taobaoItemSearchResult);
//                 console.log("item_search ??????", errorInfo);
//                 if (errorInfo.error_code === '4008') {
//                     await wait(200);
//                     i -= 1;
//                 }
//                 else if (errorInfo.error_code === '5000') { //
//                     if (taobaoIids.length === 0) return throwError(errors.etc("????????? ????????? ????????????. ???????????? ???????????????."), ctx);
//                     break;
//                 }
//                 else {
//                     return throwError(errors.oneboundAPIError(JSON.stringify(errorInfo)), ctx);
//                 }
//             } else {
//                 try {
//                     taobaoIids = taobaoIids.concat(taobaoItemSearchResult.items.item.map(v => v.num_iid.toString()));
//                 }
//                 catch (e) {
//                     console.log(e, taobaoItemSearchResult)
//                 }
//                 await wait(200);
//             }
//         }

//         const ctx2 = ctx;

//         let isRestricted = false;
//         if (!ctx.token?.adminId && (!ctx.token?.level || ctx.token.level.level === 0)) {
//             let result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_DAY_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserDayLimit = parseInt(result.value);
//             // const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true } })
//             const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! }, select: { createdAt: true, userInfo: { select: { productCollectCount: true } } } })
//             if (isAfter(new Date(), add(user!.createdAt, { days: freeUserDayLimit }))) return throwError(errors.etc("????????????????????? ???????????????."), ctx);


//             result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_PRODUCT_LIMIT" } });
//             if (!result) return throwError(errors.notInitialized, ctx);
//             const freeUserProductLimit = parseInt(result.value);

//             // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//             const productCount = user!.userInfo!.productCollectCount;
//             if (productCount >= freeUserProductLimit) return throwError(errors.etc("?????? ???????????? ?????????????????????."), ctx);

//             taobaoIids = taobaoIids.slice(0, freeUserProductLimit - productCount);
//             isRestricted = true;
//         }
//         if (ctx.token?.userId) {
//             // const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { maxProductLimit: true } });
//             const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token.userId }, select: { productCollectCount: true, maxProductLimit: true } });
//             if (!userInfo) return throwError(errors.noSuchData, ctx);
//             if (userInfo.maxProductLimit) {
//                 // const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
//                 const productCount = userInfo.productCollectCount;
//                 if (productCount >= userInfo.maxProductLimit) return throwError(errors.etc("?????? ????????? ?????? ?????? ???????????? ?????????????????????."), ctx);
//                 taobaoIids = taobaoIids.slice(0, userInfo.maxProductLimit - productCount);
//             }
//         }

//         getItemAndSave(ctx2, Array.from(new Set([...taobaoIids])), { categoryCode: args.categoryCode ?? undefined, siilCode: args.siilCode ?? undefined, isRestricted, isAdmin }).then(() => { console.log("getTaobaoItemsByUser done.") });

//         // ??????
//         return true;
//     } catch (e) {
//         return throwError(e, ctx);
//     }
// }

export const mutation_taobao_product = extendType({
    type: "Mutation",
    definition(t) {
        // t.field("getTaobaoItemsByUser", {
        //     type: nonNull("Boolean"),
        //     description: "????????? ???????????? ?????? ????????????",
        //     args: {
        //         query: nonNull(stringArg()),
        //         orderBy: nonNull(arg({ type: "TaobaoItemOrderBy" })),
        //         startPrice: floatArg(),
        //         endPrice: floatArg(),
        //         page: intArg({ default: 1 }),
        //         pageCount: intArg({ default: 1 }),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //     },
        //     resolve: getTaobaoItemsResolver(false)
        // });
        // t.field("getTaobaoItemUsingNumIidsByUser", {
        //     type: nonNull("Int"),
        //     description: "?????? ID/URL??? ?????? ????????????",
        //     args: {
        //         taobaoIds: nonNull(list(nonNull(stringArg()))),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //     },
        //     resolve: getTaobaoItemUsingNumIidsResolver(false)
        // });
        // t.field("getTaobaoItemUsingExcelFileByUser", {
        //     type: nonNull("Int"),
        //     description: "?????? ID/URL??? ?????? ????????????",
        //     args: {
        //         data: nonNull("Upload"),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //     },
        //     resolve: getTaobaoItemUsingExcelFileResolver(false)
        // });
        // t.field("getTaobaoItemsByAdmin", {
        //     type: nonNull("Boolean"),
        //     description: "????????? ???????????? ?????? ????????????",
        //     args: {
        //         query: nonNull(stringArg()),
        //         orderBy: nonNull(arg({ type: "TaobaoItemOrderBy" })),
        //         startPrice: floatArg(),
        //         endPrice: floatArg(),
        //         page: intArg({ default: 1 }),
        //         pageCount: intArg({ default: 1 }),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //         userId: intArg(),
        //     },
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             const { userId, ...etcArgs } = args;
        //             if (userId) {
        //                 const user = await ctx.prisma.user.findUnique({ where: { id: userId }, select: { id: true } })
        //                 if (!user) return throwError(errors.noSuchData, ctx);
        //                 ctx.token!.userId = userId;
        //             }
        //             return getTaobaoItemsResolver(true)(src, etcArgs, ctx, info);
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // });
        // t.field("getTaobaoItemUsingNumIidsByAdmin", {
        //     type: nonNull("Int"),
        //     description: "?????? ID/URL??? ?????? ????????????",
        //     args: {
        //         taobaoIds: nonNull(list(nonNull(stringArg()))),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //         userId: intArg(),
        //     },
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             const { userId, ...etcArgs } = args;
        //             if (userId) {
        //                 const user = await ctx.prisma.user.findUnique({ where: { id: userId }, select: { id: true } })
        //                 if (!user) return throwError(errors.noSuchData, ctx);
        //                 ctx.token!.userId = userId;
        //             }
        //             return getTaobaoItemUsingNumIidsResolver(true)(src, etcArgs, ctx, info);
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // });
        // t.field("getTaobaoItemUsingExcelFileByAdmin", {
        //     type: nonNull("Int"),
        //     description: "?????? ID/URL??? ?????? ????????????",
        //     args: {
        //         data: nonNull("Upload"),
        //         categoryCode: stringArg(),
        //         siilCode: stringArg(),
        //         userId: intArg(),
        //     },
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             const { userId, ...etcArgs } = args;
        //             if (userId) {
        //                 const user = await ctx.prisma.user.findUnique({ where: { id: userId }, select: { id: true } })
        //                 if (!user) return throwError(errors.noSuchData, ctx);
        //                 ctx.token!.userId = userId;
        //             }
        //             return getTaobaoItemUsingExcelFileResolver(true)(src, etcArgs, ctx, info);
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // });
        t.field("getTaobaoItemUsingExtensionByUser", {
            type: nonNull("String"),
            args: {
                data: nonNull("String"),
            },
            resolve: async (src, args, ctx, info) => {
                //todo??????
                try {
                    const data = JSON.parse(args.data) as { onebound: { item: IOBItem }, sellforyou: { data: ITranslateData[] } };//JSON.parse??? JSON????????? ?????? ???????????? ????????? ???????????? 
                    //console.log("test1",data);

                    if (data.onebound?.item && (data.sellforyou?.data?.length > 0)) {
                        const translatedData = data.sellforyou.data[0];//????????? ?????????
                        const taobaoData = data.onebound.item;// ??????????????? 
                        //  console.log("test2 - translatedData",translatedData);
                        // console.log("test3 - taobaoData",taobaoData)
                        if (translatedData.taobaoNumIid !== taobaoData.num_iid) {
                            return throwError(errors.etc("??????/??????????????? ???????????? ????????????."), ctx);
                        }

                        // ????????? ?????? id ????????????
                        const refreshDay = await ctx.prisma.setting.findUnique({ where: { name: "TAOBAO_PRODUCT_REFRESH_DAY" } });
                        //todoconsole.log("refreshDay",refreshDay);
                        if (!refreshDay) {
                            return throwError(errors.notInitialized, ctx);
                        }

                        let taobaoProducts: ((TaobaoProduct & { itemData: IOBItem, translateDataObject: ITranslateData | null }) | null)[] = [];

                        const num_iid = taobaoData.num_iid;
                        const item = taobaoData;//??????
                        const originalData = JSON.stringify(item);//????????? string?????? ???????????? ?????? 
                        // console.log("originalData",originalData); //?????? ????????? 
                        let price = parseFloat(item.price);//json??? item.price??? ???????????? float type?????? ??????. ?????? object??? value??? ?????? ??? string value????????? 
                        //console.log("price = ",price);
                        if (isNaN(price)) price = 0;

                        var uniqueId = null;
                        //todoconsole.log("taobaoNumId == ",num_iid);
                        // ?????? ????????? ?????? ?????? ??? ??????????????? ????????? ??????
                        const checkUserId = await ctx.prisma.product.findMany({
                            where: { userId: ctx.token?.userId ?? null, taobaoProduct: { taobaoNumIid: num_iid } },
                            select: { id: true, userId: true, productCode: true, productStore: true, productOptionName: { select: { id: true } }, state: true, taobaoProductId: true, taobaoProduct: { select: { taobaoNumIid: true, originalData: true ,shopName : true} } }
                        });//??????????????? select column ??? ??????????????? ??????????????? ??????????????? fk??? ???????????? ???????????? ????????? ???????????????????????? ????????? ???????????????
                        //todoconsole.log("test",ctx.token);
                        //todoconsole.log("checkUserId",checkUserId);
                        if (checkUserId.length > 0) {
                            for (var i in checkUserId) {
                                var temp = JSON.parse(checkUserId[i].taobaoProduct.originalData);
                                var temp2 = checkUserId[i].taobaoProduct.shopName;
                                //todoconsole.log("temp",temp);
                                //todoconsole.log("item.shop_id",item.shop_id);
                                //todoconsole.log("temp.shop_id",temp.shop_id);
                                //todoconsole.log("temp2", temp2);
                                if (item.shop_id === temp2) {
                                    if (
                                        item.title !== temp.title ||
                                        item.price !== temp.price ||
                                        JSON.stringify(item.skus) !== JSON.stringify(temp.skus) ||
                                        JSON.stringify(item.props_list) !== JSON.stringify(temp.props_list)
                                    ) {
                                        uniqueId = checkUserId[i];
                                    }

                                    if (ctx.token?.userId) {
                                        publishUserLogData(ctx, { type: "getTaobaoItem", title: `????????? ?????? ?????? ????????? ???????????? ????????????. (${checkUserId[i].productCode})` });
                                    }

                                    return `????????? ?????? ?????? ????????? ???????????? ????????????. (${checkUserId[i].productCode})`;
                                }
                            }
                        }
                        //todoconsole.log("dsadsad",item);
                        try {
                            let updatedProduct = await ctx.prisma.taobaoProduct.create({
                                data: {
                                    id: undefined,//index??? undefined??? ????????? ?????????. .
                                    taobaoNumIid: num_iid,
                                    brand: item.brand ?? "",
                                    imageThumbnail: "http:" + item.pic_url.replace(/^https?:/, ""),
                                    originalData,
                                    price,
                                    taobaoBrandId: item.brandId?.toString() ?? null,
                                    taobaoCategoryId: item.rootCatId,
                                    name: item.title,
                                    videoUrl: item.video === "" || item.video === null  ? null : item.video ,// ????????? ??????????????? ?????????????????? 
                                    shopName : item.shopName ?? item.shopName,
                                    url : item.url ?? item.url  
                                }
                            });
                            if(!updatedProduct) return throwError(errors.etc("updatedProduct"),ctx);
                            //todoconsole.log("updatedProduct = ",updatedProduct);
                            taobaoProducts.push({ ...updatedProduct, itemData: item, translateDataObject: translatedData });



                        }
                        catch (e) {
                            //todoconsole.log("taobaoProduct Upsert Error : ", e);
                        }
                        //todoconsole.log("todo",ctx.token!);
                        const option = { isRestricted: false, isAdmin: !!ctx.token!.adminId };//isResricted:false ??? isAdmin : boolean ??????????????? 
                        //todoconsole.log("option = ",option);
                        if (!ctx.token?.adminId && (!ctx.token?.level || ctx.token.level.level < 2)) {
                            option.isRestricted = true;
                        }
                        //console.log("level",ctx.token?.level?.level);
                        //todoconsole.log("option LEVEL = ",option);

                        // ????????? ????????? ?????? ?????? ?????????
                        const cnyRateSetting = await ctx.prisma.setting.findUnique({ where: { name: "CNY_RATE" } });

                        if (!cnyRateSetting) {
                            return throwError(errors.notInitialized, ctx);
                        }
                        
                        const cnyRate = parseFloat(cnyRateSetting.value);
                        const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: ctx.token!.userId ?? 0 } });
                        //console.log("cnyRate = ",cnyRate);
                        //console.log("userInfo = ",userInfo);
                        let info: IFeeInfo = {
                            marginRate: 0,
                            marginUnitType: "PERCENT",
                            cnyRate,
                            defaultShippingFee: 0,
                            extraShippingFee: 0,
                            naverFee : 0,
                            coupangFee : 0,
                            streetFee :0,
                            streetNormalFee :0,
                            gmarketFee  :0,
                            auctionFee:0,
                            interparkFee :0,
                            wemakepriceFee :0,
                            lotteonFee:0,
                            lotteonNormalFee:0,
                            tmonFee :0,
                            naverAutoSearchTag : ""
                        };

                        if (userInfo) {
                            const productCount = await ctx.prisma.product.count({ where: { userId: ctx.token!.userId! } });
                            //console.log("productCount = ",productCount);
                            info.marginRate = userInfo.marginRate;
                            info.marginUnitType = userInfo.marginUnitType ?? "PERCENT";
                            info.cnyRate = userInfo.cnyRate;
                            //shopName - ????????? ???????????? 
                            if(item.shopName.includes("amazon")){
                                switch(item.shopName){
                                    case "amazon-jp":  info.cnyRate = userInfo.cnyRateYen ; break;
                                    case "amazon-de": info.cnyRate = userInfo.cnyRateEuro ; break;
                                    case "amazon-us": info.cnyRate = userInfo.cnyRateDollar ; break;
                                    default : break;
                                }
                            }

                            info.defaultShippingFee = userInfo.defaultShippingFee;
                            info.extraShippingFee = userInfo.extraShippingFee;
                            info.naverFee  = userInfo.naverFee
                            info.coupangFee  = userInfo.coupangFee
                            info.streetFee  = userInfo.streetFee
                            info.streetNormalFee  = userInfo.streetNormalFee
                            info.gmarketFee  = userInfo.gmarketFee
                            info.auctionFee  = userInfo.auctionFee
                            info.interparkFee  = userInfo.interparkFee
                            info.wemakepriceFee  = userInfo.wemakepriceFee
                            info.lotteonFee  = userInfo.lotteonFee
                            info.lotteonNormalFee  = userInfo.lotteonNormalFee
                            info.tmonFee  = userInfo.tmonFee
                            info.naverAutoSearchTag = userInfo.naverAutoSearchTag
                            
                            if (!option.isAdmin && option.isRestricted) {//user?????? level??? ????????? ???????????? ???????????? ??????????????? 100????????? ?????? 
                                const result = await ctx.prisma.setting.findUnique({ where: { name: "FREE_USER_PRODUCT_LIMIT" } });
                                
                                if (!result) {
                                    return throwError(errors.notInitialized, ctx);
                                }

                                const freeUserProductLimit = parseInt(result.value);

                                if (userInfo.productCollectCount >= freeUserProductLimit) {
                                    if (ctx.token?.userId) {
                                        publishUserLogData(ctx, { type: "getTaobaoItem", title: `?????? ????????? ?????? ?????? ????????? ?????????????????????.` });
                                    }

                                    return throwError(errors.etc("?????? ????????? ?????? ?????? ????????? ?????????????????????."), ctx);
                                }
                                taobaoProducts = taobaoProducts.slice(0, freeUserProductLimit - productCount);
                            }

                            if (userInfo.maxProductLimit) {//null??? ????????? ??????????????? null??? ????????? 
                                if (productCount >= userInfo.maxProductLimit) {
                                    if (ctx.token?.userId) {
                                        publishUserLogData(ctx, { type: "getTaobaoItem", title: `?????? ????????? ?????? ?????? ????????? ?????????????????????.` });
                                    }

                                    return throwError(errors.etc("?????? ????????? ?????? ?????? ????????? ?????????????????????."), ctx);
                                }
                                //todoconsole.log("count1 = ",taobaoProducts.length);//1
                                taobaoProducts = taobaoProducts.slice(0, userInfo.maxProductLimit - productCount);//? ??????????????? ????????? ????????? , ?????????????????? ??? ????????? qst
                                //todoconsole.log("count2 = ",taobaoProducts.length);//1
                            }

                            // ?????? ??????????????? product ???????????? ?????? ??????  ( increment : 1 ) ????????? ??????????????? prisma?????? ??????????????????
                            //https://github.com/prisma/prisma/releases/tag/2.6.0
                            await ctx.prisma.userInfo.update({ where: { userId: userInfo.userId }, data: { productCollectCount: { increment: taobaoProducts.length } } });
                        }

                        let category = null;
                        let categoryType = null;

                        if (item.cid !== "") {
                            category = item.cid;
                            categoryType = 'c';
                        }

                        if (item.nid !== "") {
                            category = item.nid;
                            categoryType = 'n';
                        }

                        const userId = ctx.token?.userId ?? null
                        const data2 = await ctx.prisma.userInfo.findUnique({
                            where :{
                                userId : ctx.token!.userId!
                            }
                        })
                        if(!data2) return throwError(errors.etc("no token"),ctx);
                        const calculateWonType = parseInt(data2.calculateWonType);
                
                        const wordTable = await ctx.prisma.wordTable.findMany({ where: { userId:ctx.token?.userId } });

                        //return type IFeeInfo ,/ args type : prisma , productCode, taobaoProduct(IOBItem,ITranslateData)[],userid,userInfo,categorycode,sillcode,admin 
                        const products = await saveTaobaoItemToUser(ctx.prisma, undefined, taobaoProducts, userId, info, category, categoryType, ctx.token?.adminId ?? undefined,calculateWonType,wordTable);
                        const resultProducts = products.filter((v): v is Product => v !== null);

                        if (userId) {
                            publishUserLogData(ctx, { type: "getTaobaoItem", title: `?????? ????????? ?????????????????????. (${resultProducts.map(v => v.productCode).join(",")})` });
                        }
                        

                        return `?????? ????????? ?????????????????????. (${resultProducts.map(v => v.productCode).join(",")})`
                    }
                    
                    return throwError(errors.etc("????????? ????????? ???????????? ????????????."), ctx);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});