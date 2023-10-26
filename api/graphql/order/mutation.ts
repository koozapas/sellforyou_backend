import { GraphQLResolveInfo } from "graphql";
import { arg, extendType, list, nonNull } from "nexus";
import { ArgsValue } from "nexus/dist/core";
import { Context } from "../../types";
import { throwError } from "../../utils/error";

const createNewOrder = async (src: {}, args: ArgsValue<"mutation", "createNewOrder">, ctx: Context, info: GraphQLResolveInfo) => {
  try {
    let data = [];
    await Promise.all(
      args.data.map(async (v: any) => {
        const check = await ctx.prisma.order.findUnique({
          where: {
            marketCode_UNIQUE: { marketCode: v.marketCode, orderNo: v.orderNo },
          },
        });
        if (!check) {
          data.push(
            await ctx.prisma.order.create({
              data: {
                userId: ctx.token?.userId,
                productId: v.sellerProductManagementCode
                  ? v.sellerProductManagementCode.includes("SFY_")
                    ? parseInt(v.sellerProductManagementCode.split("_")[1], 36)
                    : undefined
                  : undefined,
                marketCode: v.marketCode,
                orderNo: v.orderNo,
                taobaoOrderNo: v.taobaoOrderNo ? v.taobaoOrderNo : "",
                productName: v.productName,
                orderQuantity: v.orderQuantity,
                productOptionContents: v.productOptionContents ? v.productOptionContents : "",
                sellerProductManagementCode: v.sellerProductManagementCode ? v.sellerProductManagementCode : "",
                orderMemberName: v.orderMemberName,
                orderMemberTelNo: v.orderMemberTelNo,
                productPayAmt: v.productPayAmt,
                deliveryFeeAmt: v.deliveryFeeAmt,
                individualCustomUniqueCode: v.individualCustomUniqueCode ? v.individualCustomUniqueCode : "",
                receiverName: v.receiverName,
                receiverTelNo1: v.receiverTelNo1,
                receiverIntegratedAddress: v.receiverIntegratedAddress,
                receiverZipCode: v.receiverZipCode,
                productOrderMemo: v.productOrderMemo ? v.productOrderMemo : "",
                state: 1,
              },
            })
          );
        }
      })
    );

    return data.length;
  } catch (e) {
    return throwError(e, ctx);
  }
};

export const mutation_order = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewOrder", {
      type: nonNull("Int"),
      args: {
        data: nonNull(list(nonNull(arg({ type: "newOrderInput" })))),
      },
      resolve: createNewOrder,
    });
  },
});
