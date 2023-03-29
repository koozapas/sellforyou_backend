import { GraphQLResolveInfo } from "graphql";
import { arg, extendType, floatArg, intArg, list, nonNull, stringArg } from "nexus";
import { ArgsValue, booleanArg, isObject } from "nexus/dist/core";
import { Context } from "../../types";
import { errors, throwError } from "../../utils/error";
import {
  uploadToS3AvoidDuplicate,
  uploadToS3AvoidDuplicateByBuffer,
  uploadToS3WithEditor2,
  uploadToS3WithEditor,
  deleteFromS3,
  deleteS3Folder,
  getProductListAllKeys,
} from "../../utils/file_manage";
import { calculatePrice } from "../../utils/local/calculate-product-price";
import { publishUserLogData } from "../../utils/local/pubsub";
import { SiilEncodedSavedData, siilInfo } from "../siil";
import { t_ProductOption, t_SillInfoA001 } from "./model";
import { prisma } from "@prisma/client";
import { ar } from "date-fns/locale";
import { ProductStoreStateEnum } from "../../graphql";
import { shopDataUrlInfo } from "../../playauto_api_type";
// it is will delete after update to front todo
const initProductImageByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductImageByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });

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
      where: { id: product.id },
      data: {
        description: desc_html,
        imageThumbnailData,
        isImageTranslated: false,
      },
    });

    product.productOptionName.map((v: any) => {
      if (v.productId === product.id) {
        v.productOptionValue.map((w: any) => {
          let code = `${v.taobaoPid}:${w.taobaoVid}`;

          taobaoData.prop_imgs.prop_img.map(async (x: any) => {
            if (code === x.properties) {
              await ctx.prisma.productOptionValue.update({
                where: { id: w.id },
                data: {
                  image: x.url,
                },
              });
            }
          });
        });
      }
    });

    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const initProductThumbnailImageByUser = async (
  src: {},
  args: ArgsValue<"Mutation", "initProductThumbnailImageByUser">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });

    if (!product) {
      return throwError(errors.noSuchData, ctx);
    }

    let taobaoData = JSON.parse(product.taobaoProduct.originalData);

    let imageThumbnailData = JSON.stringify(
      taobaoData.item_imgs.map((v: any) => {
        if (!/^https?/.test(v.url)) return `http:${v.url}`;
        else return v.url;
      })
    );

    await ctx.prisma.product.update({
      where: { id: product.id },
      data: {
        imageThumbnailData,
        isImageTranslated: false,
      },
    });

    return imageThumbnailData;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const initProductOptionImageByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductOptionImageByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });

    if (!product) {
      return throwError(errors.noSuchData, ctx);
    }

    let taobaoData = JSON.parse(product.taobaoProduct.originalData);
    interface returnDataType {
      data: {}[];
    }

    const returnData = { data: [] } as returnDataType;
    let optionId = "";

    let test = product.productOptionName.map((v: any) => {
      let temp = v.productOptionValue.map((w: any) => {
        let code = `${v.taobaoPid}:${w.taobaoVid}`;
        let result = taobaoData.prop_imgs.prop_img.find((x: any) => x.properties === code);
        return { id: w.id, img: !result ? null : result.url };
      });

      return { id: v.id, optionValues: temp };
    });

    test.map((data: any) => {
      data.optionValues.map(async (valueData: any) => {
        //console.log(`option ID = ${valueData.id}  image = ${valueData.img}`);
        await ctx.prisma.productOptionValue.update({
          where: {
            id: valueData.id,
          },
          data: {
            image: valueData.img,
          },
        });
      });
    });

    return JSON.stringify(test);
  } catch (e) {
    return throwError(e, ctx);
  }
};

const initProductDescriptionByUser = async (src: {}, args: ArgsValue<"Mutation", "initProductDescriptionByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { taobaoProduct: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });

    if (!product) {
      return throwError(errors.noSuchData, ctx);
    }

    let taobaoData = JSON.parse(product.taobaoProduct.originalData);
    let description = await uploadToS3WithEditor(taobaoData.desc, ["product", product.id], "description");

    // let desc_html = ``;

    // for (var i in taobaoData.desc_img) {
    //     desc_html += `<img src=${taobaoData.desc_img[i]} alt="" />`;
    // }

    await ctx.prisma.product.update({
      where: { id: product.id },
      data: {
        description: description,
        isImageTranslated: false,
      },
    });

    return description;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductOptionShippingFee = async (
  src: {},
  args: ArgsValue<"mutation", "updateProductOptionShippingFee">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
  try {
    const productOption = ctx.prisma.productOption.update({
      where: { id: args.productOptionId },
      data: {
        defaultShippingFee: args.defaultShippingFee,
      },
    });
    if (!productOption) return throwError(errors.etc("업데이트를 할수 없습니다."), ctx);
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateProductOptionResolver = async (src: {}, args: ArgsValue<"mutation", "updateProductOption">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    console.log("args.productOption.length", args.productOption.length);
    if (args.productOption.length !== 0) {
      await ctx.prisma.productOption.deleteMany({ where: { productId: args.productOption[0].productId } });

      const test = await ctx.prisma.productOption.createMany({
        data: args.productOption.map((v: any) => {
          return {
            id: undefined,
            productId: v.productId,
            optionValue1Id: v.optionValue1Id,
            optionValue2Id: v.optionValue2Id ? v.optionValue2Id : undefined,
            optionValue3Id: v.optionValue3Id ? v.optionValue3Id : undefined,
            optionValue4Id: v.optionValue4Id ? v.optionValue4Id : undefined,
            optionValue5Id: v.optionValue5Id ? v.optionValue5Id : undefined,
            isActive: v.isActive,
            taobaoSkuId: v.taobaoSkuId,
            priceCny: v.priceCny,
            defaultShippingFee: v.defaultShippingFee,
            price: v.price,
            stock: v.stock,
            optionString: v.optionString,
          };
        }),
      });
      const tt = await ctx.prisma.productOption.findMany({
        where: {
          productId: args.productOption[0].productId,
        },
      });
      let list: any = [];
      tt.map(async (v) => {
        await list.push(v.id);
      });

      if (!test) return throwError(errors.etc("저장 실패"), ctx);
      return list;
    } else {
      let list: any = [];
      await ctx.prisma.productOption.deleteMany({ where: { productId: args.id } });
      return list;
    }
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateProductCategory2 = async (src: {}, args: ArgsValue<"Mutation", "updateProductCategory2">, ctx: Context, info: GraphQLResolveInfo) => {
  let results: any = [];
  let result: any;
  await ctx.prisma.product.update({
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
    },
  });
  if (args.categoryA077) {
    result = await ctx.prisma.categoryInfoA077.findUnique({
      where: { code: args.categoryA077 },
      // include : { sillInfoA077 :{  include : { sillInfoA001 : true, sillInfoA006 : true, sillInfoA027 : true , sillInfoA112: true, sillInfoA113 : true, sillInfoA524 : true , sillInfoA525 : true, sillInfoB378 : true, sillInfoB719 : true, sillInfoB956 : true}}
      // 원래 스마트스토어 기반으로 고시를 등록했었는데 -> 각 카테고리 오픈마켓에 맞는 고시가 카테고리에 세분화하지못해서 ,, -> 근데 카테고리를 바꾸는 경우가 있어서 각 카테고리에 맞는
      // 고시를 들고왔음, 그랬더니 몇몇 고시가 맞지 않는다고 이슈가 오는중 .. 참고,, 그렇다고 스스기준으로 다 들고오면 카테고리 변경사항에 따라서 적용이 안되서 문제가 됨
      include: {
        sillInfoA077: true,
        categoryInfoA001: { include: { sillInfoA001: true } },
        categoryInfoA006: { include: { sillInfoA006: true } },
        categoryInfoA027: { include: { sillInfoA027: true } },
        categoryInfoA112: { include: { sillInfoA112: true } },
        categoryInfoA113: { include: { sillInfoA113: true } },
        categoryInfoA524: { include: { sillInfoA524: true } },
        categoryInfoA525: { include: { sillInfoA525: true } },
        categoryInfoB378: { include: { sillInfoB378: true } },
        categoryInfoB719: { include: { sillInfoB719: true } },
        categoryInfoB956: { include: { sillInfoB956: true } },
      },
    });
    let sillInfoA077: any = [
      { code: result.sillInfoA077.code, name: result.sillInfoA077.name, data: result.sillInfoA077.data },
      {
        code: "ETC",
        name: "기타 재화",
        data: '[{"code": "itemName", "name": "품명", "type": "input"}, {"code": "modelName", "name": "모델명", "type": "input"}, {"code": "certificateDetails", "name": "법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항.", "type": "input"}, {"code": "manufacturer", "name": "제조자(사)", "type": "input"}, {"code": "afterServiceDirector", "name": "A/S 책임자 또는 소비자상담 관련 전화번호", "type": "input"}]',
      },
    ];
    let sillInfoB378: any = [
      result.categoryInfoB378.sillInfoB378,
      {
        code: "기타 재화",
        name: "기타 재화",
        data: '[{"code": "품명 및 모델명", "name": "품명 및 모델명", "type": "input"}, {"code": "인증/허가 사항", "name": "인증/허가 사항", "type": "input"}, {"code": "제조국(원산지)", "name": "제조국(원산지)", "type": "input"}, {"code": "제조자(수입자)", "name": "제조자(수입자)", "type": "input"}, {"code": "소비자상담 관련 전화번호", "name": "소비자상담 관련 전화번호", "type": "input"}]',
      },
    ];
    let sillInfoA112: any = [
      result.categoryInfoA112.sillInfoA112,
      {
        code: "891045",
        name: "기타 재화",
        data: '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]',
      },
    ];
    let sillInfoA027: any = [
      result.categoryInfoA027.sillInfoA027,
      {
        code: "38",
        name: "기타",
        data: '[{"code": "3801", "name": "품명 및 모델명", "type": "input"}, {"code": "3802", "name": "소유권 이전 조건", "type": "input"}, {"code": "3803", "name": "상품의 고장·분실·훼손 시 소비자 책임", "type": "input"}, {"code": "3804", "name": "중도 해약 시 환불 기준", "type": "input"}, {"code": "3805", "name": "소비자상담 관련 전화번호", "type": "input"}, {"code": "3806", "name": "비고", "type": "input"}]',
      },
    ];
    let sillInfoA001: any = [
      result.categoryInfoA001.sillInfoA001,
      {
        code: "35",
        name: "기타",
        data: '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]',
      },
    ];
    let sillInfoA006: any = [
      result.categoryInfoA006.sillInfoA006,
      {
        code: "35",
        name: "기타",
        data: '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]',
      },
    ];
    let sillInfoB719: any = [
      result.categoryInfoB719.sillInfoB719,
      {
        code: "38",
        name: "기타 재화",
        data: '[{"code": "195", "name": "품명 및 모델명", "type": "input"}, {"code": "197", "name": "법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "198", "name": "제조국 또는 원산지", "type": "input"}, {"code": "201", "name": "제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "203", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]',
      },
    ];
    let sillInfoA113: any = [
      result.categoryInfoA113.sillInfoA113,
      {
        code: "891045",
        name: "기타 재화",
        data: '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]',
      },
    ];
    let sillInfoA524: any = [
      result.categoryInfoA524.sillInfoA524,
      {
        code: "38",
        name: "기타(재화)",
        data: '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]',
      },
    ];
    let sillInfoA525: any = [
      result.categoryInfoA525.sillInfoA525,
      {
        code: "38",
        name: "기타(재화)",
        data: '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]',
      },
    ];
    let sillInfoB956: any = [
      result.categoryInfoB956.sillInfoB956,
      {
        code: "기타 재화",
        name: "기타 재화",
        data: '[{"code": "1166", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1170", "name": "2. 법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1174", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "1178", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1182", "name": "5. A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]',
      },
    ];
    sillInfoA077 = sillInfoA077.filter((item: any, i: any) => {
      return (
        sillInfoA077.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoB378 = sillInfoB378.filter((item: any, i: any) => {
      return (
        sillInfoB378.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA112 = sillInfoA112.filter((item: any, i: any) => {
      return (
        sillInfoA112.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA027 = sillInfoA027.filter((item: any, i: any) => {
      return (
        sillInfoA027.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA001 = sillInfoA001.filter((item: any, i: any) => {
      return (
        sillInfoA001.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA006 = sillInfoA006.filter((item: any, i: any) => {
      return (
        sillInfoA006.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoB719 = sillInfoB719.filter((item: any, i: any) => {
      return (
        sillInfoB719.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA113 = sillInfoA113.filter((item: any, i: any) => {
      return (
        sillInfoA113.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA524 = sillInfoA524.filter((item: any, i: any) => {
      return (
        sillInfoA524.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoA525 = sillInfoA525.filter((item: any, i: any) => {
      return (
        sillInfoA525.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    sillInfoB956 = sillInfoB956.filter((item: any, i: any) => {
      return (
        sillInfoB956.findIndex((item2: any, j: any) => {
          return item.code === item2.code;
        }) === i
      );
    });
    results.push({
      sillInfoA077,
      sillInfoB378,
      sillInfoA112,
      sillInfoA027,
      sillInfoA001,
      sillInfoA006,
      sillInfoB719,
      sillInfoA113,
      sillInfoA524,
      sillInfoA525,
      sillInfoB956,
    });
    // results.push({ sillInfoA077: [...new Set([ {code : result.sillInfoA077.code , name : result.sillInfoA077.name , data :result.sillInfoA077.data}, {code : 'ETC' , name : '기타 재화', data : '[{"code": "itemName", "name": "품명", "type": "input"}, {"code": "modelName", "name": "모델명", "type": "input"}, {"code": "certificateDetails", "name": "법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항.", "type": "input"}, {"code": "manufacturer", "name": "제조자(사)", "type": "input"}, {"code": "afterServiceDirector", "name": "A/S 책임자 또는 소비자상담 관련 전화번호", "type": "input"}]'}])],
    // sillInfoB378 : [...new Set([result.categoryInfoB378.sillInfoB378, { code : '기타 재화' , name : '기타 재화', data : '[{"code": "품명 및 모델명", "name": "품명 및 모델명", "type": "input"}, {"code": "인증/허가 사항", "name": "인증/허가 사항", "type": "input"}, {"code": "제조국(원산지)", "name": "제조국(원산지)", "type": "input"}, {"code": "제조자(수입자)", "name": "제조자(수입자)", "type": "input"}, {"code": "소비자상담 관련 전화번호", "name": "소비자상담 관련 전화번호", "type": "input"}]'}])],
    // sillInfoA112 : [...new Set([result.categoryInfoA112.sillInfoA112, { code : '891045' , name : '기타 재화', data : '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]'}])],
    // sillInfoA027 : [...new Set([result.categoryInfoA027.sillInfoA027, { code : '38' , name : '기타', data : '[{"code": "3801", "name": "품명 및 모델명", "type": "input"}, {"code": "3802", "name": "소유권 이전 조건", "type": "input"}, {"code": "3803", "name": "상품의 고장·분실·훼손 시 소비자 책임", "type": "input"}, {"code": "3804", "name": "중도 해약 시 환불 기준", "type": "input"}, {"code": "3805", "name": "소비자상담 관련 전화번호", "type": "input"}, {"code": "3806", "name": "비고", "type": "input"}]'}])],
    // sillInfoA001 : [...new Set([result.categoryInfoA001.sillInfoA001, { code : '35' , name : '기타', data : '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]'}])],
    // sillInfoA006 : [...new Set([result.categoryInfoA006.sillInfoA006, { code : '35' , name : '기타', data : '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]'}])],
    // sillInfoB719 : [...new Set([result.categoryInfoB719.sillInfoB719, { code : '38' , name : '기타 재화', data : '[{"code": "195", "name": "품명 및 모델명", "type": "input"}, {"code": "197", "name": "법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "198", "name": "제조국 또는 원산지", "type": "input"}, {"code": "201", "name": "제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "203", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]'}])],
    // sillInfoA113 : [...new Set([result.categoryInfoA113.sillInfoA113, { code : '891045' , name : '기타 재화', data : '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]'}])],
    // sillInfoA524 : [...new Set([result.categoryInfoA524.sillInfoA524, { code : '38' , name : '기타(재화)', data : '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]'}])],
    // sillInfoA525 : [...new Set([result.categoryInfoA525.sillInfoA525, { code : '38' , name : '기타(재화)', data : '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]'}])],
    // sillInfoB956 : [...new Set([result.categoryInfoB956.sillInfoB956, { code : '31' , name : '기타 재화', data : '[{"code": "1166", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1170", "name": "2. 법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1174", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "1178", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1182", "name": "5. A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]'}])]
    // });
  } else {
    if (args.categoryB378) {
      result = await ctx.prisma.categoryInfoB378.findUnique({ where: { code: args.categoryB378 }, include: { sillInfoB378: true } });
      results.push(result.sillInfoB378);
      if (!result.sillInfoB378.name.includes("기타"))
        results.push({
          code: "기타 재화",
          name: "기타 재화",
          data: '[{"code": "품명 및 모델명", "name": "품명 및 모델명", "type": "input"}, {"code": "인증/허가 사항", "name": "인증/허가 사항", "type": "input"}, {"code": "제조국(원산지)", "name": "제조국(원산지)", "type": "input"}, {"code": "제조자(수입자)", "name": "제조자(수입자)", "type": "input"}, {"code": "소비자상담 관련 전화번호", "name": "소비자상담 관련 전화번호", "type": "input"}]',
        });
    } else if (args.categoryA112) {
      result = await ctx.prisma.categoryInfoA112.findUnique({ where: { code: args.categoryA112 }, include: { sillInfoA112: true } });
      results.push(result.sillInfoA112);
      if (!result.sillInfoA112.name.includes("기타"))
        results.push({
          code: "891045",
          name: "기타 재화",
          data: '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]',
        });
    } else if (args.categoryA027) {
      result = await ctx.prisma.categoryInfoA027.findUnique({ where: { code: args.categoryA027 }, include: { sillInfoA027: true } });
      results.push(result.sillInfoA027);
      if (!result.sillInfoA027.name.includes("기타"))
        results.push({
          code: "38",
          name: "기타",
          data: '[{"code": "3801", "name": "품명 및 모델명", "type": "input"}, {"code": "3802", "name": "소유권 이전 조건", "type": "input"}, {"code": "3803", "name": "상품의 고장·분실·훼손 시 소비자 책임", "type": "input"}, {"code": "3804", "name": "중도 해약 시 환불 기준", "type": "input"}, {"code": "3805", "name": "소비자상담 관련 전화번호", "type": "input"}, {"code": "3806", "name": "비고", "type": "input"}]',
        });
    } else if (args.categoryA001) {
      result = await ctx.prisma.categoryInfoA001.findUnique({ where: { code: args.categoryA001 }, include: { sillInfoA001: true } });
      results.push(result.sillInfoA001);
      if (!result.sillInfoA001.name.includes("기타"))
        results.push({
          code: "35",
          name: "기타",
          data: '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]',
        });
    } else if (args.categoryA006) {
      result = await ctx.prisma.categoryInfoA006.findUnique({ where: { code: args.categoryA006 }, include: { sillInfoA006: true } });
      results.push(result.sillInfoA006);
      if (!result.sillInfoA006.name.includes("기타"))
        results.push({
          code: "35",
          name: "기타",
          data: '[{"code": "35-1", "name": "품명 및 모델명", "type": "input"}, {"code": "35-2", "name": "허가 관련", "type": "input"}, {"code": "35-3", "name": "제조국 또는 원산지", "type": "input"}, {"code": "35-4", "name": "제조자/수입자", "type": "input"}, {"code": "35-5", "name": "관련 연락처", "type": "input"}, {"code": "35-6", "name": "주문후 예상 배송기간", "type": "input"}]',
        });
    } else if (args.categoryB719) {
      result = await ctx.prisma.categoryInfoB719.findUnique({ where: { code: args.categoryB719 }, include: { sillInfoB719: true } });
      results.push(result.sillInfoB719);
      if (!result.sillInfoB719.name.includes("기타"))
        results.push({
          code: "38",
          name: "기타 재화",
          data: '[{"code": "195", "name": "품명 및 모델명", "type": "input"}, {"code": "197", "name": "법에 의한 인증, 허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "198", "name": "제조국 또는 원산지", "type": "input"}, {"code": "201", "name": "제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "203", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]',
        });
    } else if (args.categoryA113) {
      result = await ctx.prisma.categoryInfoA113.findUnique({ where: { code: args.categoryA113 }, include: { sillInfoA113: true } });
      results.push(result.sillInfoA113);
      if (!result.sillInfoA113.name.includes("기타"))
        results.push({
          code: "891045",
          name: "기타 재화",
          data: '[{"code": "23759100", "name": "제조국 또는 원산지", "type": "input"}, {"code": "23756033", "name": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "11905", "name": "제조자/수입자", "type": "input"}, {"code": "23760413", "name": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}, {"code": "11800", "name": "품명 및 모델명", "type": "input"}]',
        });
    } else if (args.categoryA524) {
      result = await ctx.prisma.categoryInfoA524.findUnique({ where: { code: args.categoryA524 }, include: { sillInfoA524: true } });
      results.push(result.sillInfoA524);
      if (!result.sillInfoA524.name.includes("기타"))
        results.push({
          code: "38",
          name: "기타(재화)",
          data: '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]',
        });
    } else if (args.categoryA525) {
      result = await ctx.prisma.categoryInfoA525.findUnique({ where: { code: args.categoryA525 }, include: { sillInfoA525: true } });
      results.push(result.sillInfoA525);
      if (!result.sillInfoA525.name.includes("기타"))
        results.push({
          code: "38",
          name: "기타(재화)",
          data: '[{"code": "0210", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1400", "name": "2. 법에 의한 인증ㆍ허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1420", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "0070", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1440", "name": "5. A/S 책임자와 전화번호 또는 소비자 상담 관련 전화번호", "type": "input"}]',
        });
    } else if (args.categoryB956) {
      result = await ctx.prisma.categoryInfoB956.findUnique({ where: { code: args.categoryB956 }, include: { sillInfoB956: true } });
      results.push(result.sillInfoB956);
      if (!result.sillInfoB956.name.includes("기타"))
        results.push({
          code: "기타 재화",
          name: "기타 재화",
          data: '[{"code": "1166", "name": "1. 품명 및 모델명", "type": "input"}, {"code": "1170", "name": "2. 법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항", "type": "input"}, {"code": "1174", "name": "3. 제조국 또는 원산지", "type": "input"}, {"code": "1178", "name": "4. 제조자, 수입품의 경우 수입자를 함께 표기", "type": "input"}, {"code": "1182", "name": "5. A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호", "type": "input"}]',
        });
    }
  }
  if (!result) return throwError(errors.etc("해당 product의 업데이트가 실패하였습니다."), ctx);
  return JSON.stringify(results);
};
const updateProductCategory = async (src: {}, args: ArgsValue<"Mutation", "updateProductCategory">, ctx: Context, info: GraphQLResolveInfo) => {
  //이거뭐고
  // const productStore = await ctx.prisma.productStore.findMany(
  //     {
  //         where : {
  //             productId : args.productId,
  //             state : 2,
  //         }

  //     }
  // )
  // if(productStore.length > 0) return throwError(errors.etc("해당 product의 productStore가 존재하지 않습니다."),ctx);

  const result = await ctx.prisma.product.update({
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
    },
  });

  if (!result) return throwError(errors.etc("해당 product의 업데이트가 실패하였습니다."), ctx);
  return "OK";
};

const updateProductResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });

    if (!product) return throwError(errors.noSuchData, ctx);

    if (ctx.token?.userId && product.userId !== ctx.token.userId) {
      return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
    }

    //스토어에 등록된 상품일 경우에는 해당스토어의 카테고리가 수정되면 안되서 그런 처리를 했다고 한다.
    if (product.productStore.find((v) => v.state === 2 && args.categoryA077 && v.siteCode === "A077")) {
      args.categoryA077 = product.categoryA077;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryB378 && v.siteCode === "B378")) {
      args.categoryB378 = product.categoryB378;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA112 && v.siteCode === "A112")) {
      args.categoryA112 = product.categoryA112;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA027 && v.siteCode === "A027")) {
      args.categoryA027 = product.categoryA027;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA001 && v.siteCode === "A001")) {
      args.categoryA001 = product.categoryA001;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA006 && v.siteCode === "A006")) {
      args.categoryA006 = product.categoryA006;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryB719 && v.siteCode === "B719")) {
      args.categoryB719 = product.categoryB719;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA113 && v.siteCode === "A113")) {
      args.categoryA113 = product.categoryA113;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA524 && v.siteCode === "A524")) {
      args.categoryA524 = product.categoryA524;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryA525 && v.siteCode === "A525")) {
      args.categoryA525 = product.categoryA525;
    }

    if (product.productStore.find((v) => v.state === 2 && args.categoryB956 && v.siteCode === "B956")) {
      args.categoryB956 = product.categoryB956;
    }

    if (args.siilCode) {
      if (siilInfo.findIndex((v) => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
    }

    const siil: SiilEncodedSavedData | null =
      args.siilCode && args.siilData ? { c: args.siilCode, d: args.siilData!.map((v) => ({ c: v.code, v: v.value })) } : null;

    if (args.optionNames.length !== product.productOptionName.length) {
      return throwError(errors.etc("옵션명 중 누락된 부분이 발견되었습니다."), ctx);
    }

    if (args.optionValues.length !== product.productOptionName.flatMap((v) => v.productOptionValue).length) {
      return throwError(errors.etc("옵션값 중 누락된 부분이 발견되었습니다."), ctx);
    }
    const data = await ctx.prisma.userInfo.findUnique({
      where: {
        userId: ctx.token!.userId!,
      },
    });
    if (!data) return throwError(errors.etc("no token"), ctx);
    const calculateWonType = parseInt(data.calculateWonType);

    //todo 각 옵션 배열이 들어온다면 해당 옵션을 루프돌려서 업데이트 처리해주네 ..
    var productPrice = Math.round((args.price ?? product.price) / calculateWonType) * calculateWonType;

    if (args.options.length > 0) {
      productPrice = Math.min(...args.options.map((v) => Math.round(v.price / calculateWonType) * calculateWonType));
    }

    await Promise.all(
      product.productOption.map(async (w) => {
        var enabled = false;

        await Promise.all(
          args.options.map(async (v) => {
            if (v.id === w.id) {
              await ctx.prisma.productOption.update({
                where: { id: v.id },
                data: { price: Math.round(v.price / calculateWonType) * calculateWonType, isActive: true, stock: v.stock },
              });

              enabled = true;
            }
          })
        );

        if (!enabled) {
          await ctx.prisma.productOption.update({ where: { id: w.id }, data: { isActive: false } });
        }
      })
    );

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
      where: { id: product.id },
      data: {
        name: args.name ?? undefined,
        price: productPrice ?? undefined,
        localShippingFee: args.localShippingFee ? Math.round(args.localShippingFee / calculateWonType) * calculateWonType : undefined,
        localShippingCode: args.localShippingCode,
        shippingFee: args.shippingFee ? Math.round(args.shippingFee / calculateWonType) * calculateWonType : undefined,
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
      },
    });

    return result;
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateDescription = async (src: {}, args: ArgsValue<"Mutation", "updateDescription">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId } });
    if (!product) return throwError(errors.etc("해당 상품이 존재하지 않습니다."), ctx);
    const description = args.description ? await uploadToS3WithEditor2(args.description, ["product", product.id], "description") : undefined;
    if (!description) return throwError(errors.etc("description 업데이트 과정에 문제가 생겼습니다."), ctx);
    const success = await ctx.prisma.product.update({
      where: { id: product.id },
      data: { description },
    });
    if (!success) return throwError(errors.etc("업데이트 과정에 문제가 생겼습니다."), ctx);
    return description;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyDescription = async (src: {}, args: ArgsValue<"Mutation", "updateManyDescription">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    await Promise.all(
      args.data.map(async (v: any) => {
        const product = await ctx.prisma.product.findUnique({ where: { id: v.productId } });
        if (!product) return throwError(errors.etc("해당 상품이 존재하지 않습니다."), ctx);
        const description = v.description ? await uploadToS3WithEditor2(v.description, ["product", product.id], "description") : undefined;
        if (!description) return throwError(errors.etc("description 업데이트 과정에 문제가 생겼습니다."), ctx);
        await ctx.prisma.product.update({
          where: { id: product.id },
          data: { description },
        });
      })
    );
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateImageThumbnailData = async (src: {}, args: ArgsValue<"Mutation", "updateImageThumbnailData">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId } });
    if (!product) return throwError(errors.etc("해당 상품이 존재하지 않습니다."), ctx);
    let imageThumbnailData = product.imageThumbnailData;
    let uploadImageresult: string[] = [];
    if (args.thumbnails && args.thumbnails.length > 0) {
      let imageArray: string[] = [];

      for (let v of args.thumbnails) {
        let image = v.defaultImage;

        if (v.uploadImage) {
          image = await uploadToS3AvoidDuplicate(v.uploadImage, ["product", product.id]);
          uploadImageresult.push("https://img.sellforyou.co.kr/sellforyou/" + image);
        }
        //썸네일 https 수정
        // imageArray.push(image.replace(/^https?:/, "http:"));
        imageArray.push(image);
      }
      imageThumbnailData = JSON.stringify(imageArray);
    }
    const success = await ctx.prisma.product.update({
      where: { id: args.productId },
      data: { imageThumbnailData },
    });

    if (!success) return throwError(errors.etc("업데이트 과정에 문제가 생겼습니다."), ctx);
    return uploadImageresult.toString();
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductNameResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findUnique({
      where: { id: args.productId },
      include: { productOption: true, productOptionName: { include: { productOptionValue: true } } },
    });
    if (!product) return throwError(errors.noSuchData, ctx);
    if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
    if (args.name.trim().length === 0) return throwError(errors.etc("이름을 입력하세요."), ctx);
    await ctx.prisma.product.update({
      where: { id: product.id },
      data: {
        name: args.name.trim(),
      },
    });
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateMultipleProductNameByUser = async (
  src: {},
  args: ArgsValue<"Mutation", "updateMultipleProductNameByUser">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
  try {
    await Promise.all(
      args.data.map(async (v: any) => {
        await ctx.prisma.product.update({
          where: { id: v.productIds },
          data: {
            name: v.name,
          },
        });
      })
    );
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductTagResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductTagByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    await ctx.prisma.product.update({
      where: { id: args.productId },
      data: {
        searchTags: args.searchTags,
        immSearchTags: args.immSearchTags,
      },
    });

    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyProductTagResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductTagByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    //console.log("1", args.searchTags);
    //console.log("2",args.immSearchTags);
    await ctx.prisma.product.updateMany({
      where: { id: { in: args.productIds } },
      data: {
        searchTags: args.searchTags !== null ? args.searchTags : undefined,
        immSearchTags: args.immSearchTags !== null ? args.immSearchTags : undefined,
      },
    });
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyProductNameResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const products = await ctx.prisma.product.findMany({
      where: { ...(ctx.token?.userId ? { userId: ctx.token.userId } : {}), id: { in: args.productIds } },
      select: { id: true, name: true },
    });

    let head = args.head === "" ? "" : args.head + " ";
    let tail = args.tail === "" ? "" : " " + args.tail;

    await Promise.all(
      products.map(async (v) => {
        await ctx.prisma.product.update({
          where: { id: v.id },
          data: {
            name: head + (args.body === "" ? v.name : args.body) + tail,
          },
        });

        return 0;
      })
    );

    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyProductCategoryResolver = async (
  src: {},
  args: ArgsValue<"Mutation", "updateManyProductCategoryByUser">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
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

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA077 && v.siteCode === "A077")) {
        categoryInfo.categoryA077 = product.categoryA077;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryB378 && v.siteCode === "B378")) {
        categoryInfo.categoryB378 = product.categoryB378;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA112 && v.siteCode === "A112")) {
        categoryInfo.categoryA112 = product.categoryA112;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA027 && v.siteCode === "A027")) {
        categoryInfo.categoryA027 = product.categoryA027;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA001 && v.siteCode === "A001")) {
        categoryInfo.categoryA001 = product.categoryA001;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA006 && v.siteCode === "A006")) {
        categoryInfo.categoryA006 = product.categoryA006;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryB719 && v.siteCode === "B719")) {
        categoryInfo.categoryB719 = product.categoryB719;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA113 && v.siteCode === "A113")) {
        categoryInfo.categoryA113 = product.categoryA113;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA524 && v.siteCode === "A524")) {
        categoryInfo.categoryA524 = product.categoryA524;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryA525 && v.siteCode === "A525")) {
        categoryInfo.categoryA525 = product.categoryA525;
      }

      if (product.productStore.find((v) => v.state === 2 && categoryInfo.categoryB956 && v.siteCode === "B956")) {
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
        },
      });
    }).length;

    return result;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyProductSiilInfoResolver = async (
  src: {},
  args: ArgsValue<"Mutation", "updateManyProductSiilInfoByUser">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
  try {
    if (siilInfo.findIndex((v) => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
    const result = await ctx.prisma.product.updateMany({
      where: { userId: ctx.token!.userId, id: { in: args.productIds } },
      data: { siilCode: args.siilCode },
    });
    return result.count;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const deleteUserResolver = async (src: {}, args: ArgsValue<"Mutation", "deleteUserByAdmin">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    //userId 는 배열로 받을수있게끔 설정,
    //todo list product가 존재할경우 -> 등록상품의경우는 등록된상품 해지하지않고 걍 수집과 동일하게 일괄삭제, product가 존재하지 않을경우엔 유저 삭제 순서 .
    const product = await ctx.prisma.product.findMany({
      where: { userId: { in: args.userId } },
      select: { id: true, userId: true, productStore: true, productOptionName: { select: { id: true } } },
    });
    if (!product) {
      //상품이 존재하지 않을때
      await ctx.prisma.purchaseLog.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.userInfo.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.userLog.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.wordTable.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.user.deleteMany({ where: { id: { in: args.userId } } });
    } else {
      //상품이 존재할떄

      let productIdList: any = [];
      product.map((v) => productIdList.push(v.id));
      await ctx.prisma.productOption.deleteMany({ where: { productId: { in: productIdList } } });

      const productOptionNameId: any = [];
      const productStoreId: any = [];

      product.map((v: any) => {
        v.productStore.map((w: any) => {
          productStoreId.push(w.id);
        });
        v.productOptionName.map((w: any) => {
          productOptionNameId.push(w.id);
        });
      });

      await Promise.all(
        productIdList.map(async (v: any) => {
          await deleteS3Folder(`product/${v}/`);
        })
      );

      await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: productStoreId } } });
      await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: productOptionNameId } } });
      await ctx.prisma.productViewLog.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.productStore.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.productOptionName.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.product.deleteMany({ where: { id: { in: productIdList } } });
      //여기까지 모든  수집 상품삭제 완료
      await ctx.prisma.purchaseLog.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.userInfo.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.wordTable.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.userLog.deleteMany({ where: { userId: { in: args.userId } } });
      await ctx.prisma.user.deleteMany({ where: { id: { in: args.userId } } });
    }

    await Promise.all(
      args.userId.map(async (v: any) => {
        console.log(v);
        await deleteS3Folder(`user/${v}/info/`);
      })
    );

    return true;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const deleteUserProductResolver = async (src: {}, args: ArgsValue<"Mutation", "deleteUserProductByAdmin">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    //userId 는 배열로 받을수있게끔 설정,
    //todo list product가 존재할경우 -> 등록상품의경우는 등록된상품 해지하지않고 걍 수집과 동일하게 일괄삭제, product가 존재하지 않을경우엔 유저 삭제 순서 .
    const product = await ctx.prisma.product.findMany({
      where: { userId: { in: args.userId } },
      select: { id: true, userId: true, productStore: true, productOptionName: { select: { id: true } } },
    });
    if (!product) {
      //상품이 존재하지 않을때
    } else {
      //상품이 존재할떄
      let productIdList: any = [];
      product.map((v) => productIdList.push(v.id));
      await ctx.prisma.productOption.deleteMany({ where: { productId: { in: productIdList } } });
      const productOptionNameId: any = [];
      const productStoreId: any = [];
      product.map((v: any) => {
        v.productStore.map((w: any) => {
          productStoreId.push(w.id);
        });
        v.productOptionName.map((w: any) => {
          productOptionNameId.push(w.id);
        });
      });
      await Promise.all(
        productIdList.map(async (v: any) => {
          await deleteS3Folder(`product/${v}/`);
        })
      );
      await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: productStoreId } } });
      await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: productOptionNameId } } });
      await ctx.prisma.productViewLog.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.productStore.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.productOptionName.deleteMany({ where: { productId: { in: productIdList } } });
      await ctx.prisma.product.deleteMany({ where: { id: { in: productIdList } } });
      //여기까지 모든  수집 상품삭제 완료
    }

    return true;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const deleteProductResolver = async (src: {}, args: ArgsValue<"Mutation", "deleteProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.findMany({
      where: { id: { in: args.productId } },
      select: { id: true, userId: true, productStore: true, productOptionName: { select: { id: true } } },
    });
    if (!product) return throwError(errors.noSuchData, ctx);

    if (ctx.token?.userId && product[0].userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 삭제할 수 없습니다."), ctx);

    await ctx.prisma.productOption.deleteMany({ where: { productId: { in: args.productId } } });

    const productOptionNameId: any = [];
    const productStoreId: any = [];

    product.map((v: any) => {
      v.productStore.map((w: any) => {
        productStoreId.push(w.id);
      });
      v.productOptionName.map((w: any) => {
        productOptionNameId.push(w.id);
      });
    });

    await Promise.all(
      args.productId.map(async (v: any) => {
        await deleteS3Folder(`product/${v}/`);
      })
    );

    await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: productStoreId } } });
    await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: productOptionNameId } } });
    await ctx.prisma.productViewLog.deleteMany({ where: { productId: { in: args.productId } } });
    await ctx.prisma.productStore.deleteMany({ where: { productId: { in: args.productId } } });
    await ctx.prisma.productOptionName.deleteMany({ where: { productId: { in: args.productId } } });
    await ctx.prisma.product.deleteMany({ where: { id: { in: args.productId } } });

    return true;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductSinglePriceResolver = async (
  src: {},
  args: ArgsValue<"Mutation", "updateProductSinglePriceResolver">,
  ctx: Context,
  info: GraphQLResolveInfo
) => {
  try {
    const price = await ctx.prisma.product.update({
      where: {
        id: args.productId,
      },
      data: {
        price: args.price,
      },
    });
    if (!price) throwError(errors.etc("가격수정에 실패하였습니다."), ctx);
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateProductPriceResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductPriceByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const data = await ctx.prisma.userInfo.findUnique({
      where: {
        userId: ctx.token!.userId!,
      },
    });
    if (!data) return throwError(errors.etc("no token"), ctx);
    const calculateWonType = parseInt(data.calculateWonType);

    const boundCalculatePrice = (cnyPrice: number, cnyRate: number, localShippingFee: number, calculateWonType: number) =>
      calculatePrice.bind(null, cnyPrice, args.marginRate, args.marginUnitType, cnyRate, localShippingFee, calculateWonType)();

    const products = await ctx.prisma.product.findMany({
      where: { ...(ctx.token?.userId ? { userId: ctx.token.userId } : {}), id: { in: args.productIds } },
      select: {
        id: true,
        cnyRate: true,
        localShippingFee: true,
        localShippingCode: true,
        productOption: { select: { id: true, priceCny: true } },
        taobaoProduct: { select: { price: true, originalData: true } },
      },
    });

    await Promise.all(
      products.map(async (v) => {
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
        let productMinprice = 0;
        test = await Promise.all(
          v.productOption.map(async (v) => {
            const result = await ctx.prisma.productOption.update({
              where: {
                id: v.id,
              },

              data: {
                price: boundCalculatePrice(v.priceCny, cnyRate, localShippingFee, calculateWonType),
                defaultShippingFee: localShippingFee,
              },
            });
            return result.isActive ? result.price : 0;
          })
        );
        //console.log("test",test);
        let testZero = test.filter((v: any) => v);
        if (testZero.length > 0) productMinprice = Math.min(...testZero);
        //console.log("productMinprice",productMinprice);
        await ctx.prisma.product.update({
          where: { id: v.id },
          data: {
            price: productMinprice === 0 ? boundCalculatePrice(v.taobaoProduct.price, cnyRate, localShippingFee, calculateWonType) : productMinprice,
            cnyRate: cnyRate,
            marginRate: args.marginRate,
            marginUnitType: args.marginUnitType,
            shippingFee: args.shippingFee,
            localShippingFee: localShippingFee,
            localShippingCode: localShippingCode,
          },
        });
        return 0;
      })
    );

    return products.length;
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateManyProductOption = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductOption">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    await Promise.all(
      args.data.map(async (v: any) => {
        console.log("records error input", v);
        const test = await ctx.prisma.productOption.update({
          where: { id: v.productOptionId },
          data: {
            defaultShippingFee: v.defaultShippingFee ?? undefined,
            price: v.price ?? undefined,
            stock: v.stock ?? undefined,
            isActive: v.isActive ?? undefined,
          },
        });
        console.log("records error result", test);
      })
    );
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const restoreProductOptionValue = async (src: {}, args: ArgsValue<"Mutation", "restoreProductOptionValue">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const findOrigin = await ctx.prisma.productOptionValue.findMany({
      where: {
        productOptionNameId: args.productOptionNameId,
      },
    });

    const update = await Promise.all(
      findOrigin.map(async (x: any) => {
        return await ctx.prisma.productOptionValue.update({
          where: { id: x.id },
          data: { name: x.originalName },
        });
      })
    );

    // console.log("update",update);
    return JSON.stringify(update);
  } catch (e) {
    return throwError(e, ctx);
  }
};

const coupangCategorySillCodeInput = async (src: {}, args: ArgsValue<"Mutation", "coupangCategorySillCodeInput">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    await Promise.all(
      args.data.map(async (v: any) => {
        await ctx.prisma.categoryInfoB378.update({
          where: { code: v.categoryCode },
          data: { sillCode: v.sillCode },
        });
      })
    );
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateManyProductOptionValue = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductOptionValue">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    await Promise.all(
      args.data.map(async (v: any) => {
        await ctx.prisma.productOptionValue.update({
          where: { id: v.productOptionValueId },
          data: { name: v.name ?? undefined },
        });
      })
    );
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductSillDatasByUser = async (src: {}, args: ArgsValue<"Mutation", "updateProductSillDatasByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const products = await ctx.prisma.product.updateMany({
      where: { userId: ctx.token!.userId, id: { in: args.productIds } },
      data: {
        sillDataA001: args.data_a001 ?? undefined,
        sillDataA006: args.data_a006 ?? undefined,
        sillDataA113: args.data_a113 ?? undefined,
        sillDataA112: args.data_a112 ?? undefined,
        sillDataA524: args.data_a524 ?? undefined,
        sillDataA525: args.data_a525 ?? undefined,
        sillDataA077: args.data_a077 ?? undefined,
        sillDataB378: args.data_b378 ?? undefined,
        sillDataB719: args.data_b719 ?? undefined,
        sillDataB956: args.data_b956 ?? undefined,
        sillDataA027: args.data_a027 ?? undefined,
      },
    });
    return JSON.stringify(products);
  } catch (e) {
    return throwError(e, ctx);
  }
};

const updateProductSillCodesByUser = async (src: {}, args: ArgsValue<"Mutation", "updateProductSillCodesByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const products = await ctx.prisma.product.updateMany({
      where: { userId: ctx.token!.userId, id: { in: args.productIds } },
      data: {
        sillCodeA001: args.code_a001 ?? undefined,
        sillCodeA006: args.code_a006 ?? undefined,
        sillCodeA113: args.code_a113 ?? undefined,
        sillCodeA112: args.code_a112 ?? undefined,
        sillCodeA524: args.code_a524 ?? undefined,
        sillCodeA525: args.code_a525 ?? undefined,
        sillCodeA077: args.code_a077 ?? undefined,
        sillCodeB378: args.code_b378 ?? undefined,
        sillCodeB719: args.code_b719 ?? undefined,
        sillCodeB956: args.code_b956 ?? undefined,
        sillCodeA027: args.code_a027 ?? undefined,
      },
    });
    return JSON.stringify(products);
  } catch (e) {
    return throwError(e, ctx);
  }
};

const endProductSellStateResolver = async (src: {}, args: ArgsValue<"Mutation", "endProductSellStateByUser">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const products = await ctx.prisma.product.updateMany({ where: { userId: ctx.token!.userId, id: { in: args.productIds } }, data: { state: 10 } });
    return products.count;
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateProductFee = async (src: {}, args: ArgsValue<"Mutation", "updateProductFee">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.update({
      where: {
        id: args.productId,
      },
      data: {
        naverFee: args.naverFee ?? undefined,
        coupangFee: args.coupangFee ?? undefined,
        streetFee: args.streetFee ?? undefined,
        streetNormalFee: args.streetNormalFee ?? undefined,
        gmarketFee: args.gmarketFee ?? undefined,
        auctionFee: args.auctionFee ?? undefined,
        interparkFee: args.interparkFee ?? undefined,
        wemakepriceFee: args.wemakepriceFee ?? undefined,
        lotteonFee: args.lotteonFee ?? undefined,
        lotteonNormalFee: args.lotteonNormalFee ?? undefined,
        tmonFee: args.tmonFee ?? undefined,
      },
    });
    if (!product) return throwError(errors.etc("업데이트를 할수 없습니다"), ctx);
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
const updateManyProductFee = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductFee">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    const product = await ctx.prisma.product.updateMany({
      where: { id: { in: args.productId } },
      data: {
        naverFee: args.naverFee ?? undefined,
        coupangFee: args.coupangFee ?? undefined,
        streetFee: args.streetFee ?? undefined,
        streetNormalFee: args.streetNormalFee ?? undefined,
        gmarketFee: args.gmarketFee ?? undefined,
        auctionFee: args.auctionFee ?? undefined,
        interparkFee: args.interparkFee ?? undefined,
        wemakepriceFee: args.wemakepriceFee ?? undefined,
        lotteonFee: args.lotteonFee ?? undefined,
        lotteonNormalFee: args.lotteonNormalFee ?? undefined,
        tmonFee: args.tmonFee ?? undefined,
      },
    });
    if (!product) return throwError(errors.etc("업데이트를 할수 없습니다"), ctx);
    return "OK";
  } catch (e) {
    return throwError(e, ctx);
  }
};
export async function copyProductsToUser(targetProductIds: number[], ctx: Context, userId: number) {
  const targetProducts = await ctx.prisma.product.findMany({
    where: { id: { in: targetProductIds } },
    include: {
      productOption: {
        include: { productOption1: true, productOption2: true, productOption3: true },
      },
      productOptionName: { include: { productOptionValue: true } },
      taobaoProduct: { select: { taobaoNumIid: true } },
    },
  });
  return await Promise.all(
    targetProducts.map(async (product) => {
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
        },
      });
      newProduct = await ctx.prisma.product.update({ where: { id: newProduct.id }, data: { productCode: "SFYA_" + newProduct.id.toString(36) } });

      const newProductOptionName = await Promise.all(
        productOptionName.map(async (v) => {
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
                  data: v.productOptionValue.map((v) => {
                    const { id, productOptionNameId, ...etc } = v;
                    return etc;
                  }),
                },
              },
            },
            include: { productOptionValue: true },
          });
        })
      );

      await ctx.prisma.productOption.createMany({
        data: product.productOption.map((productOption) => {
          const { productOption1, productOption2, productOption3, ...etc } = productOption;
          return {
            ...etc,
            id: undefined,
            product_id: newProduct.id,
            option_value1_id: newProductOptionName
              .find((v) => v.order === 1)!
              .productOptionValue.find((v) => v.taobaoVid === productOption.productOption1.taobaoVid)!.id,
            option_value2_id:
              newProductOptionName.find((v) => v.order === 2)?.productOptionValue.find((v) => v.taobaoVid === productOption.productOption2?.taobaoVid)?.id ??
              null,
            option_value3_id:
              newProductOptionName.find((v) => v.order === 3)?.productOptionValue.find((v) => v.taobaoVid === productOption.productOption3?.taobaoVid)?.id ??
              null,
          };
        }),
      });

      return newProduct;
    })
  );
}

export const mutation_product = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProductSillDatasByUser", {
      type: "String",
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        data_a077: stringArg(),
        data_b378: stringArg(),
        data_a112: stringArg(),
        data_a027: stringArg(),
        data_a001: stringArg(),
        data_a006: stringArg(),
        data_a113: stringArg(),
        data_a524: stringArg(),
        data_a525: stringArg(),
        data_b719: stringArg(),
        data_b956: stringArg(),
      },
      resolve: updateProductSillDatasByUser,
    });
    t.field("updateProductSillCodesByUser", {
      type: "String",
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        code_a077: stringArg(),
        code_b378: stringArg(),
        code_a112: stringArg(),
        code_a027: stringArg(),
        code_a001: stringArg(),
        code_a006: stringArg(),
        code_a113: stringArg(),
        code_a524: stringArg(),
        code_a525: stringArg(),
        code_b719: stringArg(),
        code_b956: stringArg(),
      },
      resolve: updateProductSillCodesByUser,
    });
    t.field("initProductThumbnailImageByUser", {
      type: "String",
      args: {
        productId: nonNull(intArg()),
      },
      resolve: initProductThumbnailImageByUser,
    });
    t.field("initProductOptionImageByUser", {
      type: "String",
      args: {
        productId: nonNull(intArg()),
      },
      resolve: initProductOptionImageByUser,
    });
    t.field("initProductDescriptionByUser", {
      type: "String",
      args: {
        productId: nonNull(intArg()),
      },
      resolve: initProductDescriptionByUser,
    });
    t.field("initProductImageByUser", {
      type: "String",
      args: {
        productId: nonNull(intArg()),
      },
      resolve: initProductImageByUser,
    });
    t.field("updateProductOptionShippingFee", {
      type: "String",
      args: {
        productOptionId: nonNull(intArg()),
        defaultShippingFee: nonNull(intArg()),
      },
      resolve: updateProductOptionShippingFee,
    });
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
          const product = await ctx.prisma.product.findUnique({
            where: { id: args.productId },
            include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
          });

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
          const productOptionValues = product.productOptionName.flatMap((v) => v.productOptionValue);
          if (args.optionValues.some((v) => productOptionValues.findIndex((v2) => v2.id === v.id) === -1))
            return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);

          for (let v of args.optionValues) {
            let image = v.image;
            if (v.newImageBase64) {
              const base64str = v.newImageBase64;
              const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
              if (res) {
                let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                if (ext === "jpeg") {
                  ext = "jpg";
                }

                image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${v.id}_.${ext}`, mimetype, ["product", product.id]);
              } else {
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

                  if (ext === "jpeg") {
                    ext = "jpg";
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
            where: { id: product.id },
            data: {
              isImageTranslated: true,
              description: description,
              imageThumbnailData,
            },
          });
          if (ctx.token?.userId) {
            publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
          }
          return result;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });

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
          const product = await ctx.prisma.product.findUnique({
            where: { id: args.productId },
            include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
          });

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
          const productOptionValues = product.productOptionName.flatMap((v) => v.productOptionValue);
          if (args.optionValues.some((v) => productOptionValues.findIndex((v2) => v2.id === v.id) === -1))
            return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);

          interface Resultobject {
            thumbnails: {
              defaultImage: any;
              newImage: any;
            }[];
            productId: number;
            description: string;
            optionValues: {
              id: number;
              defaultImage: any;
              newImage: any;
            }[];
          }

          const a1 = {
            thumbnails: [],
            productId: 0,
            description: "",
            optionValues: [],
          } as Resultobject;

          a1.productId = args.productId;
          for (let [index, value] of args.optionValues.entries()) {
            let image = value.image;
            let defaultImage = image;
            if (value.newImageBase64) {
              const base64str = value.newImageBase64;
              const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
              if (res) {
                let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                if (ext === "jpeg") {
                  ext = "jpg";
                }

                image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${value.id}_.${ext}`, mimetype, ["product", product.id]);

                a1.optionValues.push({
                  defaultImage: defaultImage,
                  id: value.id,
                  newImage: "https://img.sellforyou.co.kr/sellforyou/" + image,
                });
              } else {
                image = undefined;
              }
            }
            await ctx.prisma.productOptionValue.update({ where: { id: value.id }, data: { image } });
          }

          let imageThumbnailData = product.imageThumbnailData;
          if (args.thumbnails && args.thumbnails.length > 0) {
            let imageArray: string[] = [];
            for (let [index, v] of args.thumbnails.entries()) {
              let image: string | undefined = v.defaultImage;
              let defaultImage = image;
              if (v.uploadImageBase64) {
                const base64str = v.uploadImageBase64;
                const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                if (res) {
                  let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                  let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                  if (ext === "jpeg") {
                    ext = "jpg";
                  }

                  image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail.${ext}`, mimetype, ["product", product.id]);
                  a1.thumbnails.push({
                    defaultImage: defaultImage,
                    newImage: "https://img.sellforyou.co.kr/sellforyou/" + image,
                  });
                }
              }
              //썸네일 https 수정
              imageArray.push(image.replace(/^https?:/, "http:"));
            }
            imageThumbnailData = JSON.stringify(imageArray);
          }
          const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
          a1.description = description !== undefined ? "https://img.sellforyou.co.kr/sellforyou/" + description : "";
          const result = await ctx.prisma.product.update({
            where: { id: product.id },
            data: {
              isImageTranslated: true,
              description: description,
              imageThumbnailData,
            },
          });
          if (ctx.token?.userId) {
            publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
          }
          return JSON.stringify(a1);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("testProductStoreCnt", {
      type: nonNull("String"),
      args: {
        siteCode: nonNull(stringArg()),
        productId: nonNull(intArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          return "OK";
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
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
          const product = await ctx.prisma.product.findUnique({
            where: { id: args.productId },
            include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } },
          });

          if (!product) {
            return throwError(errors.noSuchData, ctx);
          }

          if (ctx.token?.userId && product.userId !== ctx.token.userId) {
            return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
          }

          const productOptionValues = product.productOptionName.flatMap((v) => v.productOptionValue);

          if (args.optionValues.some((v: any) => productOptionValues.findIndex((v2) => v2.id === v.id) === -1)) {
            return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);
          }

          interface Resultobject {
            productId: number;

            thumbnails: {
              index: number;
              newImage: any;
            }[];

            optionValues: {
              id: number;
              newImage: any;
            }[];

            description: string;
          }

          const a1 = {
            thumbnails: [],
            productId: 0,
            description: "",
            optionValues: [],
          } as Resultobject;

          a1.productId = args.productId;

          // thumbnail
          let imageThumbnailData = JSON.parse(product.imageThumbnailData);

          let thumbnails = await Promise.all(
            imageThumbnailData.map(async (v: any, i: number) => {
              if (!args.thumbnails || args.thumbnails.length < 1) {
                return v;
              }

              const matched = args.thumbnails.find((w: any) => w.index === i);

              if (!matched || !matched.uploadImageBase64) {
                return v;
              }

              const res = matched.uploadImageBase64.match(/data:(image\/.*?);base64,(.*)/);

              if (!res) {
                return v;
              }

              let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

              let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

              if (ext === "jpeg") {
                ext = "jpg";
              }

              const image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail${(i + 1).toString().padStart(2, "0")}.${ext}`, mimetype, [
                "product",
                product.id,
              ]);

              a1.thumbnails.push({
                index: i,
                newImage: "https://img.sellforyou.co.kr/sellforyou/" + image,
              });

              return image;
            })
          );

          // option
          if (args.optionValues.length > 0) {
            a1.optionValues = await Promise.all(
              productOptionValues.map(async (v: any, i: number) => {
                const matched = args.optionValues.find((w: any) => w.id === v.id);

                if (!matched || !matched.newImageBase64) {
                  return {
                    id: v.id,
                    newImage: null,
                  };
                }

                const res = matched.newImageBase64.match(/data:(image\/.*?);base64,(.*)/);

                if (!res) {
                  return {
                    id: v.id,
                    newImage: null,
                  };
                }

                let [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];

                let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

                if (ext === "jpeg") {
                  ext = "jpg";
                }

                const image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${matched.id}_${(i + 1).toString().padStart(2, "0")}.${ext}`, mimetype, [
                  "product",
                  product.id,
                ]);

                await ctx.prisma.productOptionValue.update({
                  where: {
                    id: matched.id,
                  },

                  data: {
                    image,
                  },
                });

                return {
                  id: v.id,
                  newImage: "https://img.sellforyou.co.kr/sellforyou/" + image,
                };
              })
            );
          }

          // description
          const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;

          a1.description = description ? "https://img.sellforyou.co.kr/sellforyou/" + description : "";

          // update
          const result = await ctx.prisma.product.update({
            where: {
              id: product.id,
            },

            data: {
              isImageTranslated: true,
              imageThumbnailData: JSON.stringify(thumbnails),
              description,
            },
          });

          if (ctx.token?.userId) {
            publishUserLogData(ctx, { type: "updateProductImage", title: `상품의 이미지 정보가 수정되었습니다. (${result.productCode})` });
          }

          return JSON.stringify(a1);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("testAddjobCallBack", {
      type: nonNull("Boolean"),
      args: {
        response: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          let response = JSON.parse(args.response);
          const result = response.results["result.json"];
          result.map((v: any, i: any, a: any) => (a[i].setdata = "_생략_"));

          const results = await Promise.all(
            result.map(async (v: any) => {
              const name = v.code.split("_");
              const productId = parseInt(name[1], 36);
              const product = await ctx.prisma.product.findUnique({
                where: { id: productId },
                include: {
                  productStore: {
                    orderBy: [{ id: "desc" }],
                  },
                  user: { select: { userInfo: { select: { naverStoreUrl: true } } } },
                },
              });
              if (!product) {
                return throwError(errors.etc("addJob 정보 없음"), ctx);
              }
              //test
              const productStore = product.productStore.find((v2) => v2.siteCode === v.site_code);
              if (!productStore) {
                if (v.state !== 1 && v.state !== 2) {
                  return throwError(errors.etc("addJob 콜백 : state가 1,2가 아님"), ctx);
                }
                const productStoreState =
                  v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : { connect: { id: ProductStoreStateEnum.REGISTER_FAILED } };
                const etcVendorItemId = v.site_code === "B378" ? v.slave_reg_code_sub : undefined;
                const updatedResult = await ctx.prisma.productStore.create({
                  data: {
                    storeProductId: v.slave_reg_code !== "" ? v.slave_reg_code : undefined,
                    productStoreState: productStoreState,
                    productStoreLog:
                      v.state === 2
                        ? {
                            create: {
                              jobId: response.job_id,
                              destState: ProductStoreStateEnum.ON_SELL,
                              uploadState: v.state,
                              errorMessage: v.msg,
                            },
                          }
                        : undefined,
                    cnt: 0,
                    product: { connect: { id: product.id } },
                    etcVendorItemId: etcVendorItemId === "" || etcVendorItemId === null ? undefined : etcVendorItemId,
                    storeUrl:
                      v.slave_reg_code !== ""
                        ? shopDataUrlInfo[v.site_code]({
                            id: v.slave_reg_code,
                            storeFullPath: product.user?.userInfo?.naverStoreUrl,
                            vendorId: etcVendorItemId,
                          })
                        : undefined,
                    siteCode: v.site_code,
                    user: { connect: { id: product.userId! } },
                    inflow: 1,
                  },
                });
                await ctx.prisma.product.update({
                  where: { id: updatedResult.productId },
                  data: {
                    //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                    state: v.state === 1 ? 7 : undefined,
                    stockUpdatedAt: v.state === 1 ? new Date() : undefined,
                  },
                });
                return { userId: product.userId, productId: product.id, reason: v.msg, state: v.state, storeUrl: v.slave_reg_code };
              } else {
                const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : undefined;
                const etcVendorItemId = v.site_code === "B378" ? v.slave_reg_code_sub : undefined;
                const updatedResult = await ctx.prisma.productStore.update({
                  where: { id: productStore.id },
                  data: {
                    storeProductId: v.state !== 2 ? (v.slave_reg_code !== "" ? v.slave_reg_code : undefined) : undefined,
                    productStoreState: productStoreState,
                    productStoreLog:
                      v.state === 2
                        ? {
                            create: {
                              jobId: response.job_id,
                              destState: ProductStoreStateEnum.ON_SELL,
                              uploadState: v.state,
                              errorMessage: v.msg,
                            },
                          }
                        : {
                            deleteMany: {
                              productStoreId: productStore.id,
                            },
                          },
                    product: { connect: { id: product.id } },
                    etcVendorItemId: etcVendorItemId === "" || etcVendorItemId === null ? undefined : etcVendorItemId,
                    storeUrl:
                      v.state !== 2
                        ? v.slave_reg_code !== ""
                          ? shopDataUrlInfo[v.site_code]({
                              id: v.slave_reg_code,
                              storeFullPath: product.user?.userInfo?.naverStoreUrl,
                              vendorId: etcVendorItemId,
                            })
                          : undefined
                        : undefined,
                    siteCode: v.site_code,
                    user: { connect: { id: product.userId! } },
                    inflow: 1,
                  },
                });
                await ctx.prisma.product.update({
                  where: { id: updatedResult.productId },
                  data: {
                    //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                    state: v.state === 1 ? 7 : undefined,
                    stockUpdatedAt: v.state === 1 ? new Date() : undefined,
                  },
                });
              }
              return { userId: product.userId, productId: product.id, reason: v.msg, state: v.state, storeUrl: v.slave_reg_code };
            })
          );
          //console.log("상품등록 결과",results);
          return true;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("selectProductViewLogByUser", {
      type: nonNull("String"),
      args: {
        timeStart: nonNull(stringArg()),
        timeEnd: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const total: any = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) } },
          });
          const a077 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a077" },
          });
          const b378 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "b378" },
          });
          const a112 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a112" },
          });
          const a113 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a113" },
          });
          const a001 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a001" },
          });
          const a006 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a006" },
          });
          const a027 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a027" },
          });
          const b719 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "b719" },
          });
          const a524 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a524" },
          });
          const a525 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "a525" },
          });
          const b956 = await ctx.prisma.productViewLog.count({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) }, siteCode: "b956" },
          });

          return JSON.stringify({ total, a077, b378, a112, a113, a001, a006, a027, b719, a524, a525, b956 });
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("selectProductViewLogDatefilterByUser", {
      type: nonNull("String"),
      args: {
        productId: intArg(),
        productName: stringArg(),
        timeStart: nonNull(stringArg()),
        timeEnd: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          let total: any = await ctx.prisma.productViewLog.findMany({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) } },
            include: {
              product_store: { select: { storeUrl: true } },
              product: { select: { id: true, productCode: true, name: true, imageThumbnailData: true } },
            },
          });

          if (args.productId !== undefined) {
            total = total.filter((v: any) => v.product.id === args.productId);
          }
          if (args.productName !== undefined) {
            total = total.filter((v: any) => v.product.name.includes(args.productName));
          }

          return JSON.stringify(total);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("selectProductViewLogDateByUser", {
      type: nonNull("String"),
      args: {
        timeStart: nonNull(stringArg()),
        timeEnd: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const total: any = await ctx.prisma.productViewLog.findMany({
            where: { userId: ctx.token?.userId, viewTime: { gte: new Date(args.timeStart), lte: new Date(args.timeEnd) } },
            include: {
              product_store: { select: { storeUrl: true } },
              product: { select: { id: true, productCode: true, name: true, imageThumbnailData: true } },
            },
          });

          return JSON.stringify(total);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("updateProductAttributeByUser", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        brandName: stringArg(),
        manufacturer: stringArg(),
        modelName: stringArg(),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const update = await ctx.prisma.product.update({
            where: { id: args.productId },
            data: {
              brandName: args.brandName ?? undefined,
              manuFacturer: args.manufacturer ?? undefined,
              modelName: args.modelName ?? undefined,
            },
          });
          if (!update) return throwError(errors.etc("Fail to update Attribute"), ctx);
          return "Success";
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("updateManyProductAttributeByUser", {
      type: nonNull("String"),
      args: {
        productId: nonNull(list(nonNull(intArg()))),
        brandName: stringArg(),
        manufacturer: stringArg(),
        modelName: stringArg(),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const update = await ctx.prisma.product.updateMany({
            where: { id: { in: args.productId } },
            data: {
              brandName: args.brandName ?? undefined,
              manuFacturer: args.manufacturer ?? undefined,
              modelName: args.modelName ?? undefined,
            },
          });
          if (!update) return throwError(errors.etc("Fail to update Attribute"), ctx);
          return "Success";
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
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
      resolve: updateProductResolver,
    });
    t.field("updateDescription", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        description: nonNull(stringArg()),
      },
      resolve: updateDescription,
    });
    t.field("updateManyDescription", {
      type: nonNull("String"),
      args: { data: nonNull(list(nonNull(arg({ type: "DescriptionDataInput" })))) },
      resolve: updateManyDescription,
    });
    t.field("updateProductFee", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        naverFee: floatArg(),
        coupangFee: floatArg(),
        streetFee: floatArg(),
        streetNormalFee: floatArg(),
        gmarketFee: floatArg(),
        auctionFee: floatArg(),
        interparkFee: floatArg(),
        wemakepriceFee: floatArg(),
        lotteonFee: floatArg(),
        lotteonNormalFee: floatArg(),
        tmonFee: floatArg(),
      },
      resolve: updateProductFee,
    });
    t.field("updateManyProductFee", {
      type: nonNull("String"),
      args: {
        productId: nonNull(list(nonNull(intArg()))),
        naverFee: floatArg(),
        coupangFee: floatArg(),
        streetFee: floatArg(),
        streetNormalFee: floatArg(),
        gmarketFee: floatArg(),
        auctionFee: floatArg(),
        interparkFee: floatArg(),
        wemakepriceFee: floatArg(),
        lotteonFee: floatArg(),
        lotteonNormalFee: floatArg(),
        tmonFee: floatArg(),
      },
      resolve: updateManyProductFee,
    });
    t.field("updateProductCategory", {
      type: nonNull("String"),
      args: {
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
      resolve: updateProductCategory,
    });
    t.field("updateProductCategory2", {
      type: nonNull("String"),
      args: {
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
      resolve: updateProductCategory2,
    });
    t.field("updateProductNameByUser", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      resolve: updateProductNameResolver,
    });
    t.field("updateMultipleProductNameByUser", {
      type: nonNull("String"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "ProductOptionNameInput" })))),
      },
      resolve: updateMultipleProductNameByUser,
    });
    t.field("updateManyProductTagByUser", {
      type: nonNull("String"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        searchTags: stringArg(),
        immSearchTags: stringArg(),
      },
      resolve: updateManyProductTagResolver,
    });
    t.field("updateProductTagByUser", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        searchTags: stringArg(),
        immSearchTags: stringArg(),
      },
      resolve: updateProductTagResolver,
    });
    t.field("updateManyProductNameByUser", {
      type: nonNull("String"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        head: stringArg(),
        body: stringArg(),
        tail: stringArg(),
      },
      resolve: updateManyProductNameResolver,
    });
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
      resolve: updateManyProductCategoryResolver,
    });
    t.field("updateManyProductSiilInfoByUser", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        siilCode: nonNull(stringArg()),
      },
      resolve: updateManyProductSiilInfoResolver,
    });
    t.field("deleteProductByUser", {
      type: nonNull("Boolean"),
      args: {
        productId: nonNull(list(nonNull(intArg()))),
      },
      resolve: deleteProductResolver,
    });
    t.field("deleteUserByAdmin", {
      type: nonNull("Boolean"),
      args: {
        userId: nonNull(list(nonNull(intArg()))),
      },
      resolve: deleteUserResolver,
    });
    t.field("deleteUserProductByAdmin", {
      type: nonNull("Boolean"),
      args: {
        userId: nonNull(list(nonNull(intArg()))),
      },
      resolve: deleteUserProductResolver,
    });
    t.field("updateProductPriceByUser", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        cnyRate: nonNull(floatArg()),
        marginRate: nonNull(floatArg()),
        marginUnitType: nonNull(stringArg()),
        shippingFee: nonNull(intArg({ description: "유료배송비" })),
        localShippingFee: nonNull(intArg({ description: "해외배송비(배대지배송비)" })),
        localShippingCode: intArg(),
      },
      resolve: updateProductPriceResolver,
    });
    t.field("updateProductSinglePriceByUser", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        price: nonNull(intArg()),
      },
      resolve: updateProductSinglePriceResolver,
    });
    t.field("endProductSellStateByUser", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
      },
      resolve: endProductSellStateResolver,
    });
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
      resolve: updateProductResolver,
    });
    t.field("updateProductOption", {
      type: nonNull(list(nonNull("Int"))),
      args: {
        id: nonNull(intArg()),
        productOption: nonNull(list(nonNull(arg({ type: "setProductOption" })))),
      },
      resolve: updateProductOptionResolver,
    });
    t.field("updateProductNameByAdmin", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      resolve: updateProductNameResolver,
    });
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
      resolve: updateManyProductCategoryResolver,
    });
    t.field("updateManyProductSiilInfoByAdmin", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        siilCode: nonNull(stringArg()),
      },
      resolve: updateManyProductSiilInfoResolver,
    });
    t.field("deleteProductByAdmin", {
      type: nonNull("Boolean"),
      args: {
        productId: nonNull(list(nonNull(intArg()))),
      },
      resolve: deleteProductResolver,
    });
    t.field("updateProductPriceByAdmin", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
        cnyRate: nonNull(floatArg()),
        marginRate: nonNull(floatArg()),
        marginUnitType: nonNull(stringArg()),
        shippingFee: nonNull(intArg({ description: "유료배송비" })),
        localShippingFee: nonNull(intArg({ description: "해외배송비(배대지배송비)" })),
        localShippingCode: intArg(),
      },
      resolve: updateProductPriceResolver,
    });
    t.field("endProductSellStateByAdmin", {
      type: nonNull("Int"),
      args: {
        productIds: nonNull(list(nonNull(intArg()))),
      },
      resolve: endProductSellStateResolver,
    });
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
          else if (user.state !== "ACTIVE") return throwError(errors.etc("해당 유저가 없습니다."), ctx);
          const targetProducts = await ctx.prisma.product.findMany({
            where: { id: { in: args.productIds }, userId: { equals: null } },
            select: { id: true, taobaoProductId: true },
          });
          const userId = user.id;
          const existingProducts = await ctx.prisma.product.findMany({
            where: {
              userId: { equals: userId },
              taobaoProductId: { in: targetProducts.map((v) => v.taobaoProductId) },
            },
            select: { taobaoProductId: true },
          });
          const filteredTargetProducts = targetProducts.filter((v) => existingProducts.findIndex((v2) => v2.taobaoProductId === v.taobaoProductId) === -1);

          if (targetProducts.length > 0 && filteredTargetProducts.length === 0)
            return throwError(errors.etc("모든 상품이 해당 유저에 수집된 상품이거나, 관리자 상품이 아닙니다."), ctx);
          const newProduct = await copyProductsToUser(
            filteredTargetProducts.map((v) => v.id),
            ctx,
            userId
          );

          return `${newProduct.length}개의 상품이 ${user.email} 유저 계정에 추가되었습니다.`;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("setProductOptionValueBySomeOne", {
      type: nonNull("String"),
      args: {
        productOptionNameId: intArg(),
        productOptionValueId: intArg(),
        isActive: nonNull(booleanArg()),
        name: stringArg(),
        image: stringArg(),
        newImage: arg({ type: "Upload" }),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          if (args.productOptionValueId) {
            //todoconsole.log("옵션 각개 활성화");
            const productOptionValue = await ctx.prisma.productOptionValue.findUnique({
              where: { id: args.productOptionValueId }, // 컬럼이아니라 각 하나하나의 id들
              select: { id: true, productOptionName: { select: { product: { select: { userId: true, id: true } } } } }, //option_value_id랑 product의 userId를 select해옴
            });
            if (!productOptionValue) return throwError(errors.etc("해당 옵션이 없습니다."), ctx);
            let returnImage = "true";
            let image = args.image ?? undefined;
            if (args.newImage) {
              image = await uploadToS3AvoidDuplicate(args.newImage, ["product", productOptionValue.productOptionName.product.id]);
              returnImage = "https://img.sellforyou.co.kr/sellforyou/" + image;
            }

            if (ctx.token?.userId && productOptionValue?.productOptionName.product.userId !== ctx.token.userId)
              return throwError(errors.etc("권한이 없습니다."), ctx);

            await ctx.prisma.productOptionValue.update({
              where: { id: productOptionValue.id },
              data: args.name ? { isActive: args.isActive, name: args.name.trim(), image } : { isActive: args.isActive, image },
            });

            return returnImage;
          } else if (args.productOptionNameId) {
            //console.log("옵션 전면 활성화");
            const productOptionName = await ctx.prisma.productOptionName.findUnique({
              where: { id: args.productOptionNameId },
              select: { id: true, product: { select: { userId: true, id: true } } },
            });
            if (!productOptionName) return throwError(errors.etc("해당 옵션이름이 없습니다."), ctx);
            if (ctx.token?.userId && productOptionName?.product.userId !== ctx.token.userId) return throwError(errors.etc("권한이 없습니다."), ctx);
            await ctx.prisma.productOptionValue.updateMany({
              where: { productOptionNameId: productOptionName.id },
              data: { isActive: args.isActive },
            });
            return "true";
          } else {
            return throwError(errors.etc("옵션 네임 id 혹은 옵션 id 필수값입니다."), ctx);
          }
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("setProductOptionNameBySomeOne", {
      type: nonNull("Boolean"),
      args: {
        productOptionNameId: nonNull(intArg()),
        isActive: nonNull(booleanArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const productOptionName = await ctx.prisma.productOptionName.findUnique({
            where: { id: args.productOptionNameId }, // 컬럼이아니라 각 하나하나의 id들
            select: { id: true, product: { select: { userId: true } } }, //option_value_id랑 product의 userId를 select해옴
          });

          if (!productOptionName) return throwError(errors.etc("해당 옵션 카테고리가 없습니다."), ctx);
          if (ctx.token?.userId && productOptionName?.product.userId !== ctx.token.userId) return throwError(errors.etc("권한이 없습니다."), ctx);

          const OptionName = await ctx.prisma.productOptionName.update({
            where: { id: productOptionName.id },
            data: { isActive: args.isActive, name: args.name.trim() },
          });
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
      },
    });
    t.field("ProductOptionNameSwap", {
      type: nonNull("Boolean"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "ProductOptionNameSwapInput" })))),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          await Promise.all(
            args.data.map(async (v: any) => {
              await ctx.prisma.productOptionName.update({
                where: { id: v.productOptionNameId },
                data: { order: v.order ?? undefined },
              });
            })
          );
          return true;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("ProductOptionValueSwap", {
      type: nonNull("Boolean"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "ProductOptionValueSwapInput" })))),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          await Promise.all(
            args.data.map(async (v: any) => {
              await ctx.prisma.productOptionValue.update({
                where: { id: v.productOptionValueId },
                data: { number: v.number ?? undefined },
              });
            })
          );
          return true;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("getProductListAllKeys", {
      type: nonNull("Boolean"),
      resolve: async (src, args, ctx, info) => {
        try {
          const test = await getProductListAllKeys("product/");
          if (!test) return throwError(errors.etc("product가 존재하지 않습니다."), ctx);
          return true;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("updateImageThumbnailData", {
      type: nonNull("String"),
      args: {
        productId: nonNull(intArg()),
        thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
      },
      resolve: updateImageThumbnailData,
    });
    t.field("updateManyProductOption", {
      type: nonNull("String"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "ProductOptionInput" })))),
      },
      resolve: updateManyProductOption,
    });
    t.field("updateManyProductOptionValue", {
      type: nonNull("String"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "ProductOptionValueInput" })))),
      },
      resolve: updateManyProductOptionValue,
    });
    t.field("coupangCategorySillCodeInput", {
      type: nonNull("String"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "sillCodeInput" })))),
      },
      resolve: coupangCategorySillCodeInput,
    });
    t.field("restoreProductOptionValue", {
      type: nonNull("String"),
      args: {
        productOptionNameId: nonNull(intArg()),
      },
      resolve: restoreProductOptionValue,
    });
    t.field("disableUserOption", {
      type: nonNull("Boolean"),
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const productOptionName = await ctx.prisma.productOptionName.findUnique({
            where: { id: args.id },
          });

          if (!productOptionName) {
            return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
          }

          const productOptionValue = await ctx.prisma.productOptionValue.findMany({ where: { productOptionNameId: productOptionName.id } });

          const optionValueIds = productOptionValue.map((v) => {
            return v.id;
          });

          await ctx.prisma.productOption.deleteMany({
            where: {
              productId: productOptionName.productId,
              optionValue1Id: productOptionName.order === 1 ? { not: optionValueIds[0] } : undefined,
              optionValue2Id: productOptionName.order === 2 ? { not: optionValueIds[0] } : undefined,
              optionValue3Id: productOptionName.order === 3 ? { not: optionValueIds[0] } : undefined,
            },
          });

          const productOption = await ctx.prisma.productOption.findMany({
            where: {
              productId: productOptionName.productId,
              optionValue1Id: productOptionName.order === 1 ? { in: optionValueIds } : undefined,
              optionValue2Id: productOptionName.order === 2 ? { in: optionValueIds } : undefined,
              optionValue3Id: productOptionName.order === 3 ? { in: optionValueIds } : undefined,
            },
          });

          await Promise.all(
            productOption.map(async (v) => {
              if (v.optionValue1Id && !v.optionValue2Id && !v.optionValue3Id) {
                await ctx.prisma.productOption.delete({
                  where: {
                    id: v.id,
                  },
                });
              } else {
                await ctx.prisma.productOption.update({
                  where: {
                    id: v.id,
                  },

                  data: {
                    optionValue1Id: productOptionName.order === 1 ? v.optionValue2Id ?? 0 : undefined,
                    optionValue2Id: productOptionName.order === 1 || productOptionName.order === 2 ? v.optionValue3Id ?? null : undefined,
                    optionValue3Id: null,
                  },
                });
              }
            })
          );

          for (let i = productOptionName.order; i < 3; i++) {
            await ctx.prisma.productOptionName.updateMany({
              where: {
                productId: productOptionName.productId,
                order: i + 1,
              },

              data: {
                order: i,
              },
            });

            await ctx.prisma.productOptionValue.updateMany({
              where: {
                productOptionNameId: productOptionName.id,
                optionNameOrder: i + 1,
              },

              data: {
                optionNameOrder: i,
              },
            });
          }

          await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: productOptionName.id } });
          await ctx.prisma.productOptionName.delete({ where: { id: productOptionName.id } });

          return true;
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
  },
});
