import { Prisma, ProductStore } from "@prisma/client";
import deepmerge from "deepmerge";
import { arg, inputObjectType, intArg, list, nonNull, objectType } from "nexus";
import { SiilEncodedSavedData } from "../siil";
import { errors, throwError } from "../../utils/error";
import { getOptionHeaderHtmlByProductId } from "../../utils/local/playauto";
import {t_order} from "../order/model";

export const t_Product = objectType({
    name: "Product",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.adminId();
        t.model.taobaoProductId();
        t.model.productCode();
        t.model.state();
        t.model.name();
        t.model.isImageTranslated();
        t.model.price();
        t.model.localShippingFee();
        t.model.localShippingCode();
        t.model.description();
        t.model.createdAt();
        t.model.modifiedAt();
        t.model.stockUpdatedAt();
        t.model.siilCode();
        t.model.imageThumbnailData();
        t.model.searchTags();
        t.model.immSearchTags();
        t.model.productStateEnum();
        t.model.naverFee();
        t.model.coupangFee();
        t.model.streetFee();
        t.model.streetNormalFee();
        t.model.gmarketFee();
        t.model.auctionFee();
        t.model.interparkFee();
        t.model.wemakepriceFee();
        t.model.lotteonFee();
        t.model.lotteonNormalFee();
        t.model.tmonFee();
        t.field("imageThumbnail", {
            type: nonNull(list(nonNull("String"))),
            resolve: async (src, args, ctx, info) => {
                try {
                    return JSON.parse(src.imageThumbnailData)
                } catch (e) {
                    return [];
                    // return throwError(e, ctx);
                }
            }
        });
        t.model.siilData();
        t.field("siilInfo", {
            type: "SiilSavedData",
            resolve: async (src, args, ctx, info) => {
                try {
                    if (src.siilData) {
                        const info = JSON.parse(src.siilData) as SiilEncodedSavedData;
                        return { code: info.c, data: info.d.map(v => ({ code: v.c, value: v.v })) }
                    }
                    return null;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.taobaoProduct();
        t.model.user();
        t.model.admin();
        t.model.productOption({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = {
                        AND: [
                            { ...args.where },
                            {
                                AND: [
                                    { productOption1: { isActive: { equals: true } } },//아마 처음엔 1넣고 
                                    {
                                        OR: [
                                            { optionValue2Id: { equals: null } },//그담부터 null인게있으면 차근차근 조회
                                            { productOption2: { isActive: { equals: true } } },
                                        ]
                                    },
                                    {
                                        OR: [
                                            { optionValue3Id: { equals: null } },
                                            { productOption3: { isActive: { equals: true } } },
                                        ]
                                    },
                                    {
                                        OR: [
                                            { optionValue4Id: { equals: null } },
                                            { productOption4: { isActive: { equals: true } } },
                                        ]
                                    }, 
                                    {
                                        OR: [
                                            { optionValue5Id: { equals: null } },
                                            { productOption5: { isActive: { equals: true } } },
                                        ]
                                    },
                                ]
                            }
                        ]
                    };
                    args.orderBy = [{ optionString: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.productOptionName({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ order: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.productStore({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ siteCode: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        
        t.field("activeTaobaoProduct",{
            type: nonNull("TaobaoProduct"),
            resolve : async (src, args, ctx, info) =>{
                try{
                const where : Prisma.TaobaoProductWhereInput = {
                    id : src.taobaoProductId
                }

                let data = await ctx.prisma.taobaoProduct.findFirst({
                    where : {
                        ...where
                    }
                })
                if(!data) return throwError(errors.etc("데이터없음."),ctx);
                const test = JSON.parse(data.originalData);
                let originalData ={
                    props : test.props,
                    skus : test.skus,
                    propsList : test.props_list,
                }
                //console.log("test", JSON.stringify(originalData));
                data.originalData = JSON.stringify(originalData);
                return data;
            }catch(e){
                return throwError(e, ctx);
            }
            } 
            
        })

        t.field("activeProductStore", {
            type: nonNull(list(nonNull("ProductStore"))),
            resolve: async (src, args, ctx, info) => {
                try {
                    const where: Prisma.ProductStoreWhereInput = {
                        productId: src.id,
                        state: 2
                    }

                    let smartStore = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A077",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let coupang = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "B378",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let street = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A112",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let action = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A001",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let gmarket = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A006",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let interpark = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A027",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let street_normal = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A113",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let wemakeprice = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "B719",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let lotteon = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A524",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let lotteon_normal = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "A525",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    let tmon = await ctx.prisma.productStore.findFirst({
                        where: {
                            ...where,
                            siteCode: "B956",
                        },
                        orderBy: [{ id: "desc" }]
                    });

                    const data = [smartStore, coupang, street, action, gmarket, interpark, street_normal, wemakeprice, lotteon, lotteon_normal, tmon].filter((v): v is ProductStore => v !== null);
                    if (src.state === 9) {//UPLOAD_FAILED
                        const errorData = await ctx.prisma.productStore.findFirst({
                            where: {
                                productId: src.id,
                                state: 3,
                            },
                            orderBy: [{ id: "desc" }]
                        });
                        if (errorData) {
                            return [errorData].concat(data);
                        }
                    }
                    return data;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("optionInfoHtml", {
            type: nonNull("String"),
            resolve: async (src, args, ctx, info) => {
                try {
                    const id = src.id;
                    return await getOptionHeaderHtmlByProductId(ctx.prisma, id, "Y", 1,"","N");
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.marginRate();
        t.model.marginUnitType();
        t.model.cnyRate();
        t.model.shippingFee();
        t.model.categoryInfoA077();
        t.model.categoryInfoA006();
        t.model.categoryInfoA001();
        t.model.categoryInfoA027();
        t.model.categoryInfoA112();
        t.model.categoryInfoA113();
        t.model.categoryInfoA524();
        t.model.categoryInfoA525();
        t.model.categoryInfoB378();
        t.model.categoryInfoB719();
        t.model.categoryInfoB956();
        t.model.brandName();
        t.model.manuFacturer();
        t.model.modelName();
        t.model.attribute();
    }
});

export const t_CategoryInfoA077 = objectType({
    name : "CategoryInfoA077",
    definition(t) {
        t.model.code();
        t.model.codeA001();
        t.model.codeA006();
        t.model.codeA027();
        t.model.codeA112();
        t.model.codeA113();
        t.model.codeA524();
        t.model.codeA525();
        t.model.codeB378();
        t.model.codeB719();
        t.model.codeB956();
        t.model.depth1();
        t.model.depth2();
        t.model.depth3();
        t.model.depth4();
        t.model.depth5();
        t.model.depth6();
        t.model.id();
        t.model.name();
        t.model.product();
        t.model.categoryInfoA001();
        t.model.categoryInfoA006();
        t.model.categoryInfoA027();
        t.model.categoryInfoA112();
        t.model.categoryInfoA113();
        t.model.categoryInfoA524();
        t.model.categoryInfoA525();
        t.model.categoryInfoB378();
        t.model.categoryInfoB719();
        t.model.categoryInfoB956();
    }
})

export const t_CategoryInfoA001 = objectType({
        name: "CategoryInfoA001",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA006 = objectType({
        name: "CategoryInfoA006",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA027 = objectType({
        name: "CategoryInfoA027",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA112 = objectType({
        name: "CategoryInfoA112",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA113 = objectType({
        name: "CategoryInfoA113",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA524 = objectType({
        name: "CategoryInfoA524",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoA525 = objectType({
        name: "CategoryInfoA525",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoB378 = objectType({
        name: "CategoryInfoB378",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoB719 = objectType({
        name: "CategoryInfoB719",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
        }
})
export const t_CategoryInfoB956 = objectType({
        name: "CategoryInfoB956",
        definition(t) {
            t.model.code();
            t.model.depth1();
            t.model.depth2();
            t.model.depth3();
            t.model.depth4();
            t.model.depth5();
            t.model.depth6();
            t.model.id();
            t.model.name();
            t.model.product();
    }})

export const t_ProductOption = objectType({
    name: "ProductOption",
    definition(t) {
        t.model.id();
        t.model.productId();
        t.model.optionValue1Id();
        t.model.optionValue2Id();
        t.model.optionValue3Id();
        t.model.optionValue4Id();
        t.model.optionValue5Id();
        t.field("name", {
            type: nonNull("String"),
            resolve: async (src, args, ctx, info) => {
                try {
                    const optionValues = await ctx.prisma.productOptionValue.findMany({
                        where: { id: { in: [src.optionValue1Id, src.optionValue2Id ?? -1, src.optionValue3Id ?? -1, src.optionValue4Id ?? -1, src.optionValue5Id ?? -1] } },
                        include: { productOptionName: true }
                    });
                    optionValues.sort((a, b) => a.optionNameOrder - b.optionNameOrder);
                    return optionValues.reduce((p, c) => p + `${c.productOptionName.name}:${c.name}, `, "").slice(0, -2);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.isActive();
        t.model.taobaoSkuId();
        t.model.priceCny();
        t.model.price();
        t.model.stock();
        t.model.optionString();
        t.model.productOption1();
        t.model.productOption2();
        t.model.productOption3();
        t.model.productOption4();
        t.model.productOption5();
        t.model.defaultShippingFee();
        t.model.product();
    }
});

export const t_ProductOptionName = objectType({
    name: "ProductOptionName",
    definition(t) {
        t.model.id();
        t.model.productId();
        t.model.order();
        t.model.name();
        t.model.isNameTranslated();
        t.model.taobaoPid();
        t.model.product();
        t.model.isActive();
        t.model.productOptionValue({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ number: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});


export const t_ProductOptionValue = objectType({
    name: "ProductOptionValue",
    definition(t) {
        t.model.id();
        t.model.productOptionNameId();
        t.model.optionNameOrder();
        t.model.name();
        t.model.originalName();
        t.model.isNameTranslated();
        t.model.taobaoVid();
        t.model.image();
        t.model.number();
        t.model.isActive();
        t.model.productOptionName();
        t.field("productOption", {
            type: nonNull(list(nonNull("ProductOption"))),
            args: {
                where: arg({ type: "ProductOptionWhereInput" }),
                orderBy: list(arg({ type: "ProductOptionOrderByWithRelationInput" })),
                take: intArg(),
                skip: intArg(),
                cursor: arg({ type: "ProductOptionWhereUniqueInput" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const a = src.optionNameOrder;
                    args.where = deepmerge<typeof args.where>(args.where,
                        a === 1 ? { isActive: { equals: true }, optionValue1Id: { equals: src.id } }
                            : a === 2 ? { isActive: { equals: true }, optionValue2Id: { equals: src.id } }
                                : { isActive: { equals: true }, optionValue3Id: { equals: src.id } }
                    );

                    return ctx.prisma.productOption.findMany({
                        where: args.where,
                        orderBy: args.orderBy,
                        skip: args.skip,
                        take: args.take,
                        cursor: args.cursor,
                    } as any)
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.optionValue1({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.optionValue2({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.optionValue3({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.optionValue4({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.optionValue5({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    }
});


export const t_test = objectType({
    name:"testType",
    definition(t) { 
     t.list.string("thumbnails"),
     t.list.string("optionvalues"),
     t.int("productId")
    }
});

export const t_ProductOptionUpdateInput = inputObjectType({
    name: "ProductOptionUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.int("price");
        t.nonNull.boolean("isActive");
        t.nonNull.int("stock");
    }
});
export const t_ProductOptionNameUpdateInput = inputObjectType({
    name: "ProductOptionNameUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
    }
});
export const t_ProductOptionValueUpdateInput = inputObjectType({
    name: "ProductOptionValueUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.boolean("isActive");
        t.string("image")
        t.upload("newImage")
        t.string("newImageBase64")
    }
});
export const t_setProductOption = inputObjectType({
    name:"setProductOption",
    definition(t){
        t.nonNull.int("productId"),
        t.nonNull.int("optionValue1Id"),
        t.int("optionValue2Id"),
        t.int("optionValue3Id"),
        t.int("optionValue4Id"),
        t.int("optionValue5Id"),
        t.nonNull.boolean("isActive"),
        t.nonNull.string("taobaoSkuId"),
        t.nonNull.float("priceCny"),
        t.nonNull.int("price"),
        t.int("stock"),
        t.nonNull.string("optionString"),
        t.nonNull.string("name")
        t.nonNull.int("defaultShippingFee")
    }
})

export const t_setProductOptionValueBySomeOne = inputObjectType({
    name: "ProductOptionValueBySomeOne",
    definition(t) {
        t.nonNull.upload("newImage")//nonNull 처리를 해야함 
    }
})
export const t_ProductOptionValueImageUpdateInput = inputObjectType({
    name: "ProductOptionValueImageUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.string("image")
        t.string("newImageBase64")
    }
});
export const t_ProductThumbnailUpdateInput = inputObjectType({
    name: "ProductThumbnailUpdateInput",
    definition(t) {
        t.nonNull.string("defaultImage");
        t.upload("uploadImage");
    }
});
export const t_ProductThumbnailImageUpdateInput = inputObjectType({
    name: "ProductThumbnailImageUpdateInput",
    definition(t) {
        t.nonNull.string("defaultImage");
        t.string("uploadImageBase64");
    }
});
export const t_ProductNewThumbnailImageUpdateInput = inputObjectType({
    name: "ProductNewThumbnailImageUpdateInput",
    definition(t) {
        t.nonNull.int("index");
        t.string("uploadImageBase64");
    }
});
export const t_InputProductOption = inputObjectType({
    name : "ProductOptionInput",
    definition(t) {
        t.nonNull.int("productOptionId"),
        t.int("defaultShippingFee")
        t.int("price")
        t.int("stock")
        t.boolean("isActive")
    }
})

export const t_InputProductOptionValue = inputObjectType({
    name : "ProductOptionValueInput",
    definition(t){
        t.nonNull.int("productOptionValueId")
        t.string("name")
    }
})

export const t_InputProductName = inputObjectType({
    name : "ProductOptionNameInput",
    definition(t){
        t.nonNull.int("productIds")
        t.string("name")
    }
})
export const t_productStateEnum= objectType({
    name: "productStateEnum",
    definition(t) {
        t.model.id()
        t.model.state()
    }})