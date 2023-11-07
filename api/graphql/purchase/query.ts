import deepmerge from "deepmerge";
import { extendType, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import { getPurchaseInfo2 } from "../user";

export const query_purchase = extendType({
  type: "Query",
  definition(t) {
    t.crud.planInfos({
      alias: "selectPlanInfosForEveryone",
      filtering: true,
      ordering: true,
      pagination: true,
      resolve: async (src, args, ctx, info, ori) => {
        try {
          if (!ctx.token || ctx.token.userId) {
            args.where = deepmerge<typeof args.where>(args.where, { isActive: { equals: true } });
          }
          return ori(src, args, ctx, info);
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
    t.field("seletExistPurchaseLog", {
      type: nonNull("Boolean"),
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (src, args, ctx, info) => {
        try {
          switch (args.email.trim()) {
            case "1%": {
              //developing ...
              return true;
            }
            case "돈벌삶": {
              return true;
            }
            case "1%수강": {
              return true;
            }
            case "dream": {
              //developing ...
              return true;
            }

            case "타오랜드": {
              //developing ...
              return true;
            }

            case "taoland": {
              //developing ...
              return true;
            }

            case "빅머니": {
              //developing ...
              return true;
            }
            default: {
              const userId = await ctx.prisma.user.findUnique({
                where: { email: args.email },
                select: { id: true },
              });
              if (!userId) return throwError(errors.etc(`${args.email}은(는) 존재하지 않는 사용자입니다.`), ctx);

              const existingInfo = await getPurchaseInfo2(ctx.prisma, userId.id);
              if (existingInfo.level < 2) return throwError(errors.etc(`${args.email}는 이용중인 사용자가 아닙니다.`), ctx);

              return true;
            }
          }
        } catch (e) {
          return throwError(e, ctx);
        }
      },
    });
  },
});
