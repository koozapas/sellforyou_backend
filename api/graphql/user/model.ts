//user/model
import { Prisma, PrismaClient } from "@prisma/client";
import { objectType, nonNull ,list,enumType} from "nexus";
import { NexusGenAllTypes } from '../../typegen';
import { throwError,errors } from "../../utils/error";
import { PurchaseLogPlanInfoType } from '../purchase';


export const getPurchaseInfo = async (prisma: PrismaClient, userId: number): Promise<NexusGenAllTypes["UserPurchaseInfo"]> => {
  if (!userId) return { level: 0, levelExpiredAt: new Date(9990, 11, 31), history: "", additionalInfo: [] };

  const purchaseInfos = await prisma.purchaseLog.findMany({ where: { userId : userId, state: "ACTIVE", expiredAt: { gte: new Date() } } });
  const purchaseInfos2 = await prisma.purchaseLog.findMany({ where: { userId : userId, state: "ACTIVE" } });
  const processedInfos = purchaseInfos.map(v => ({ ...v, planInfo: JSON.parse(v.planInfo) as PurchaseLogPlanInfoType })).sort((a, b) => (b.planInfo.planLevel ?? 0) - (a.planInfo.planLevel ?? 0));

  const planLevel = Math.max(...processedInfos.map(v => v.planInfo.planLevel ?? 0));

  const processedInfos2 = processedInfos.filter(v => v.planInfo.planLevel === planLevel).sort((a, b) => new Date(b.expiredAt).getTime() - new Date(a.expiredAt).getTime());

  const additionalInfo: NexusGenAllTypes["UserPurchaseAdditionalInfo"][] = [];
  const imageTranslate = processedInfos.find(v => v.planInfo.externalFeatureVariableId === 'IMAGE_TRANSLATE');
  const stock = processedInfos.find(v => v.planInfo.externalFeatureVariableId === 'STOCK');
  if (imageTranslate) {
      additionalInfo.push({ type: "IMAGE_TRANSLATE", expiredAt: imageTranslate.expiredAt });
  }
  if (stock) {
      additionalInfo.push({ type: "STOCK", expiredAt: stock.expiredAt });
  }
  //결제 플랜 계산
  if (processedInfos2.length === 0) return { level: 0, levelExpiredAt: new Date(9990, 11, 31), history: JSON.stringify(purchaseInfos2), additionalInfo };
  return { level: planLevel, levelExpiredAt: processedInfos2[0].expiredAt, history: JSON.stringify(purchaseInfos2), additionalInfo };
}

export const t_User = objectType({
  name: "User",
  definition(t) {
    // t.model.order({
    //   filtering:true,
    //   ordering:true,
    //   pagination:true,
    // });
    t.model.token();
    t.model.createdToken();
    t.model.id();
    t.model.email();
    t.field("password", {
      type: "String",
      resolve: () => "",
    });
    t.model.state();
    t.model.naverId();
    t.model.kakaoId();
    t.model.createdAt();
    t.model.product({
      filtering: true,
      ordering: true,
      pagination: true,
    });
    t.model.userInfo();
    t.model.master();
    t.model.masterUserId();
    t.model.refCode();
    t.model.refAvailable();
    t.model.credit();
    t.field("connectedUsers",{
      type : nonNull(list(nonNull("User"))),
      resolve : async(src,args,ctx,info) =>{
        try{
          let data = await ctx.prisma.user.findUnique({
            where : {
              id : ctx.token!.userId!
            }
          })
          if(!data) return throwError(errors.etc("We don't have Data"),ctx);
          if(data.master) {
            const subData :any = await ctx.prisma.user.findMany({
              where : {
                masterUserId : data.id
              }
            })
            return subData;
          }
          else {
            const subData = await ctx.prisma.user.findMany({
              where : {
                masterUserId : data.masterUserId
              }
            })
            return subData;
          }
        }
        catch(e){
          return throwError(e,ctx);
        }
      }
  })
    t.model.userLog({
      filtering: true,
      ordering: true,
      pagination: true,
    });
    t.nonNull.field("purchaseInfo", {
        type: nonNull("UserPurchaseInfo"),
        resolve: async (src, args, ctx, info) => {
            try {
                return getPurchaseInfo(ctx.prisma, src.id);
            } catch (e) {
                return throwError(e, ctx);
            }
        }
    })
    t.nonNull.int("productCount", {
        resolve: async (src, args, ctx, info) => {
            try {
                return ctx.prisma.product.count({ where: { userId: src.id } })
            } catch (e) {
                return throwError(e, ctx);
            }
        }
    })
    t.model.verificationNumber();
  },
});

export const enum_UserPurchaseAdditionalInfoEnum = enumType({
  name: "UserPurchaseAdditionalInfoEnumType",
  members: ["IMAGE_TRANSLATE", "STOCK"]
})


export const t_UserPurchaseAdditionalInfo = objectType({
  name: "UserPurchaseAdditionalInfo",
  definition(t) {
      t.nonNull.field("type", { type: 'UserPurchaseAdditionalInfoEnumType' });
      t.nonNull.date("expiredAt");
  }
});


export const t_UserPurchaseInfo = objectType({
  name: "UserPurchaseInfo",
  definition(t) {
      t.nonNull.int("level");
      t.nonNull.date("levelExpiredAt");
      t.nonNull.string("history");
      t.nonNull.list.nonNull.field("additionalInfo", {
          type: "UserPurchaseAdditionalInfo"
      });
  }
});


// export const t_UserPurchaseInfo = objectType({
//   name: "UserPurchaseInfo",
//   definition(t) {
//       t.nonNull.int("level");
//       t.nonNull.date("levelExpiredAt");
//       t.nonNull.list.nonNull.field("additionalInfo", {
//           type: "UserPurchaseAdditionalInfo"
//       });
//   }
// });


export const t_UserInfo = objectType({
  name: "UserInfo",
  definition(t) {
    t.model.userId();
    t.model.phone();
    t.model.marginRate();
    t.model.defaultShippingFee();
    t.model.fixImageTop();
    t.model.fixImageSubTop();
    t.model.fixImageBottom();
    t.model.fixImageSubBottom();
    t.model.cnyRate();
    t.model.productCollectCount();
    t.model.maxProductLimit();
    t.model.additionalShippingFeeJeju();
    t.model.asTel();
    t.model.asInformation();
    t.model.refundShippingFee();
    t.model.exchangeShippingFee();
    t.model.naverOriginCode();
    t.model.naverOrigin();
    t.model.naverStoreUrl();
    t.model.naverStoreOnly();
    t.model.naverFee();
    t.model.coupangOutboundShippingTimeDay();
    t.model.coupangUnionDeliveryType();
    t.model.coupangMaximumBuyForPerson();
    t.model.coupangLoginId();
    t.model.coupangVendorId();
    t.model.coupangAccessKey();
    t.model.coupangSecretKey();
    t.model.coupangImageOpt();
    t.model.coupangFee();
    t.model.coupangDefaultOutbound();
    t.model.coupangDefaultInbound();
    t.model.streetApiKey();
    t.model.streetApiKey2();
    t.model.streetApiKey3();
    t.model.streetApiKey4();
    t.model.streetFee();
    t.model.streetDefaultOutbound();
    t.model.streetDefaultInbound();
    t.model.streetNormalApiKey();
    t.model.streetNormalApiKey2();
    t.model.streetNormalApiKey3();
    t.model.streetNormalApiKey4();
    t.model.streetNormalOutbound();
    t.model.streetNormalInbound();
    t.model.streetNormalFee();
    t.model.interparkCertKey();
    t.model.interparkSecretKey();
    t.model.interparkFee();
    t.model.esmplusMasterId();
    t.model.esmplusAuctionId();
    t.model.esmplusGmarketId();
    t.model.gmarketFee();
    t.model.auctionFee();
    t.model.lotteonVendorId();
    t.model.lotteonApiKey();
    t.model.lotteonFee();
    t.model.lotteonNormalFee();
    t.model.wemakepriceId();
    t.model.wemakepriceFee();
    t.model.tmonId();
    t.model.tmonFee();
    t.model.optionAlignTop();
    t.model.optionTwoWays();
    t.model.optionIndexType();
    t.model.discountAmount();
    t.model.discountUnitType();
    t.model.descriptionShowTitle();
    t.model.collectTimeout();
    t.model.collectStock();
    t.model.marginUnitType();
    t.model.extraShippingFee();
    t.model.user();
    t.model.streetUseType();
    t.model.lotteonUseType();
    t.model.naverAutoSearchTag();
    t.model.naverUseType();
    t.model.coupangUseType();
    t.model.streetNormalUseType();
    t.model.gmarketUseType();
    t.model.auctionUseType();
    t.model.interparkUseType();
    t.model.wemakepriceUseType();
    t.model.lotteonNormalUseType();
    t.model.tmonUseType();
    t.model.lotteonSellerType();
    t.model.interparkEditCertKey();
    t.model.interparkEditSecretKey();
    t.model.autoPrice();
    t.model.defaultPrice();
    t.model.streetUseKeyType();
    t.model.streetNormalUseKeyType();
    t.model.streetApiMemo();
    t.model.streetApiMemo2();
    t.model.streetApiMemo3();
    t.model.streetApiMemo4();
    t.model.streetNormalApiMemo();
    t.model.streetNormalApiMemo2();
    t.model.streetNormalApiMemo3();
    t.model.streetNormalApiMemo4();
    t.model.calculateWonType();
    t.model.cnyRateDollar();
    t.model.cnyRateEuro();
    t.model.cnyRateYen();
  },
});


export const t_AccountInfo = objectType({
  name: "AccountInfo",
  definition(t) {
    t.nonNull.string("bankName");
    t.nonNull.string("accountHolder");
    t.nonNull.string("accountNumber");
  },
});

export interface UserLogPayload {
  type: "scrapOrder" | "registerProduct" | "getTaobaoItem" | "purchaseRenewed" | "updateProductImage";
  title: string;
  // 아래부터는 optional

  /**
   * type이 "purchaseRenewed"인 경우에는 필수로 들어감
   *
   * @author Kuhave
   * @memberof UserLogPayload
   */
  renewedAccessToken?: string;
}

export const t_UserLog = objectType({
  name: "UserLog",
  definition(t) {
    t.model.id();
    t.model.userId();
    t.model.title();
    t.model.payloadData();
    t.model.isRead();
    t.model.createdAt();
    t.model.user();
  },
});