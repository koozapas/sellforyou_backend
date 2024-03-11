import { Product, TaobaoProduct } from "@prisma/client";
import { extendType, nonNull } from "nexus";
import { IOBItem } from "../../onebound_api_types";
import { errors, throwError } from "../../utils/error";
import { IFeeInfo, saveTaobaoItemToUser } from "../../utils/local/onebound";
import { ITranslateData } from "../../translate_types";

export const mutation_taobao_product = extendType({
  type: "Mutation",
  definition(t) {
    t.field("getTaobaoItemUsingExtensionByUser", {
      type: nonNull("String"),
      args: {
        data: nonNull("String"),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          const data = JSON.parse(args.data) as {
            onebound: { item: IOBItem };
            sellforyou: { data: ITranslateData[] };
          }; //JSON.parse는 JSON문자열 구문 분석해서 객체를 생성해냄

          if (data.onebound?.item && data.sellforyou?.data?.length > 0) {
            const translatedData = data.sellforyou.data[0]; //번역한 데이터
            const taobaoData = data.onebound.item; // 원본데이터
            if (translatedData.taobaoNumIid !== taobaoData.num_iid)
              return throwError(errors.etc("원문/번역데이터 고유값이 다릅니다."), ctx);

            // 가져온 상품 id 쿼리하기
            const refreshDay = await ctx.prisma.setting.findUnique({
              where: { name: "TAOBAO_PRODUCT_REFRESH_DAY" },
            });
            if (!refreshDay) return throwError(errors.notInitialized, ctx);

            let taobaoProducts: (
              | (TaobaoProduct & {
                  itemData: IOBItem;
                  translateDataObject: ITranslateData | null;
                })
              | null
            )[] = [];

            const num_iid = taobaoData.num_iid;
            const item = taobaoData; //객체
            const originalData = JSON.stringify(item); //객체를 string으로 변환했고 다시
            let price = parseFloat(item.price); //json의 item.price를 소수점인 float type으로 변환. 이유 object에 value는 현재 다 string value이므로
            if (isNaN(price)) price = 0;

            var uniqueId = null;

            // 현재 본인이 가진 상품 중 중복상품이 있는지 검사
            const checkUserId = await ctx.prisma.product.findMany({
              where: {
                userId: ctx.token?.userId ?? null,
                taobaoProduct: { taobaoNumIid: num_iid },
              },
              select: {
                id: true,
                userId: true,
                productCode: true,
                productStore: true,
                productOptionName: { select: { id: true } },
                state: true,
                taobaoProductId: true,
                taobaoProduct: {
                  select: {
                    taobaoNumIid: true,
                    originalData: true,
                    shopName: true,
                  },
                },
              },
            });

            if (checkUserId.length > 0) {
              for (var i in checkUserId) {
                var temp = JSON.parse(checkUserId[i].taobaoProduct.originalData);
                var temp2 = checkUserId[i].taobaoProduct.shopName;
                if (item.shop_id === temp2) {
                  if (
                    item.title !== temp.title ||
                    item.price !== temp.price ||
                    JSON.stringify(item.skus) !== JSON.stringify(temp.skus) ||
                    JSON.stringify(item.props_list) !== JSON.stringify(temp.props_list)
                  )
                    uniqueId = checkUserId[i];

                  return `상품이 이미 최신 상태로 등록되어 있습니다. (${checkUserId[i].productCode})`;
                }
              }
            }
            try {
              let updatedProduct = await ctx.prisma.taobaoProduct.create({
                data: {
                  id: undefined, //index는 undefined로 입력을 하구나. .
                  taobaoNumIid: num_iid,
                  brand: item.brand ?? "",
                  imageThumbnail: "http:" + item.pic_url.replace(/^https?:/, ""),
                  originalData,
                  price,
                  taobaoBrandId: item.brandId?.toString() ?? null,
                  taobaoCategoryId: item.rootCatId,
                  name: item.title,
                  videoUrl: item.video === "" || item.video === null ? null : item.video, // 이부분 배열때문에 이슈가있엇음
                  shopName: item.shopName ?? item.shopName,
                  url: item.url,
                },
              });

              if (!updatedProduct) return throwError(errors.etc("updatedProduct"), ctx);

              taobaoProducts.push({
                ...updatedProduct,
                itemData: item,
                translateDataObject: translatedData,
              });
            } catch (e) {
              console.log(`상품생성 오류발생`, e);
            }

            const option = {
              isRestricted: false,
              isAdmin: !!ctx.token!.adminId,
            }; //isResricted:false 와 isAdmin : boolean 초기값생성

            if (!ctx.token?.adminId && (!ctx.token?.level || ctx.token.level.level < 2)) option.isRestricted = true;

            // 마진율 붙여서 본인 상품 만들기
            const cnyRateSetting = await ctx.prisma.setting.findUnique({
              where: { name: "CNY_RATE" },
            });

            if (!cnyRateSetting) return throwError(errors.notInitialized, ctx);

            const cnyRate = parseFloat(cnyRateSetting.value);
            const userInfo = await ctx.prisma.userInfo.findUnique({
              where: { userId: ctx.token!.userId ?? 0 },
            });
            let info: IFeeInfo = {
              marginRate: 0,
              marginUnitType: "PERCENT",
              cnyRate,
              defaultShippingFee: 0,
              extraShippingFee: 0,
              naverFee: 0,
              coupangFee: 0,
              streetFee: 0,
              streetNormalFee: 0,
              gmarketFee: 0,
              auctionFee: 0,
              interparkFee: 0,
              wemakepriceFee: 0,
              lotteonFee: 0,
              lotteonNormalFee: 0,
              tmonFee: 0,
              naverAutoSearchTag: "",
            };

            if (userInfo) {
              const productCount = await ctx.prisma.product.count({
                where: { userId: ctx.token!.userId! },
              });
              info.marginRate = userInfo.marginRate;
              info.marginUnitType = userInfo.marginUnitType ?? "PERCENT";
              info.cnyRate = userInfo.cnyRate;
              //shopName - 아마존 예외처리
              if (item.shopName.includes("amazon")) {
                switch (item.shopName) {
                  case "amazon-jp":
                    info.cnyRate = userInfo.cnyRateYen;
                    break;
                  case "amazon-de":
                    info.cnyRate = userInfo.cnyRateEuro;
                    break;
                  case "amazon-us":
                    info.cnyRate = userInfo.cnyRateDollar;
                    break;
                  default:
                    break;
                }
              }

              info.defaultShippingFee = userInfo.defaultShippingFee;
              info.extraShippingFee = userInfo.extraShippingFee;
              info.naverFee = userInfo.naverFee;
              info.coupangFee = userInfo.coupangFee;
              info.streetFee = userInfo.streetFee;
              info.streetNormalFee = userInfo.streetNormalFee;
              info.gmarketFee = userInfo.gmarketFee;
              info.auctionFee = userInfo.auctionFee;
              info.interparkFee = userInfo.interparkFee;
              info.wemakepriceFee = userInfo.wemakepriceFee;
              info.lotteonFee = userInfo.lotteonFee;
              info.lotteonNormalFee = userInfo.lotteonNormalFee;
              info.tmonFee = userInfo.tmonFee;
              info.naverAutoSearchTag = userInfo.naverAutoSearchTag;

              if (!option.isAdmin && option.isRestricted) {
                //user중에 level이 낮아서 이용하지 못한경우 무료유저는 100개까지 제한
                const result = await ctx.prisma.setting.findUnique({
                  where: { name: "FREE_USER_PRODUCT_LIMIT" },
                });

                if (!result) return throwError(errors.notInitialized, ctx);

                const freeUserProductLimit = parseInt(result.value);

                if (userInfo.productCollectCount >= freeUserProductLimit)
                  return throwError(errors.etc("이용 가능한 상품 수집 횟수를 초과하였습니다."), ctx);

                taobaoProducts = taobaoProducts.slice(0, freeUserProductLimit - productCount);
              }

              if (userInfo.maxProductLimit) {
                //null이 아니면 무제한이면 null을 넣어줌
                if (productCount >= userInfo.maxProductLimit)
                  return throwError(errors.etc("이용 가능한 상품 관리 개수를 초과하였습니다."), ctx);

                taobaoProducts = taobaoProducts.slice(0, userInfo.maxProductLimit - productCount); //? 무슨작업을 한건지 몰겠음 , 달라진게없음 전 후같음 qst
              }

              // 만약 수집완료시 product 수집했던 갯수 증가  ( increment : 1 ) 갯수를 증가하는걸 prisma에서 지원한다고함
              //https://github.com/prisma/prisma/releases/tag/2.6.0
              await ctx.prisma.userInfo.update({
                where: { userId: userInfo.userId },
                data: {
                  productCollectCount: { increment: taobaoProducts.length },
                },
              });
            }

            let category = null;
            let categoryType = null;

            if (item.cid !== "") {
              category = item.cid;
              categoryType = "c";
            }

            if (item.nid !== "") {
              category = item.nid;
              categoryType = "n";
            }

            const userId = ctx.token?.userId ?? null;
            const data2 = await ctx.prisma.userInfo.findUnique({
              where: {
                userId: ctx.token!.userId!,
              },
            });
            if (!data2) return throwError(errors.etc("no token"), ctx);
            const calculateWonType = parseInt(data2.calculateWonType);

            const wordTable = await ctx.prisma.wordTable.findMany({
              where: { userId: ctx.token?.userId },
              orderBy: { id: "asc" },
            });

            const products = await saveTaobaoItemToUser(
              ctx.prisma,
              undefined,
              taobaoProducts,
              userId,
              info,
              category,
              categoryType,
              ctx.token?.adminId ?? undefined,
              calculateWonType,
              wordTable
            );
            const resultProducts = products.filter((v): v is Product => v !== null);

            if (resultProducts.length >= 1) return `상품 수집이 완료되었습니다. (${resultProducts.map((v) => v.productCode).join(",")})`;
            else return `상품 수집에 문제가 있습니다.`;
          }

          return throwError(errors.etc("데이터 형식이 올바르지 않습니다."), ctx);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
  },
});
