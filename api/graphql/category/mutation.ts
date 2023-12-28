import { extendType, nonNull } from "nexus";
import { arg, list, stringArg } from "nexus/dist/core";
import { throwError } from "../../utils/error";

export const mutation_category = extendType({
  type: "Mutation",
  definition(t) {
    /** 카테고리 생성 */
    t.field("createCategoryInfoByAdmin", {
      type: nonNull("Boolean"),
      args: { shopCode: nonNull("String"), data: nonNull(list(nonNull(arg({ type: "CategoryCreateInput" })))) },
      resolve: async (src: {}, args, ctx, info) => {
        console.time(`${info.fieldName} 소요시간`);
        const totalCount = args.data.length;
        let createCount = 0;
        let updateCount = 0;
        let cursor = 0;

        console.log(`shopCode = ${args.shopCode}`);

        try {
          switch (args.shopCode) {
            case "A113":
              for (let category of args.data.map((v) => v)) {
                console.log(`${cursor}번째 카테고리 작업중...`);

                const dbData = await ctx.prisma.categoryInfoA113.findUnique({ where: { code: category.code } });

                if (dbData && dbData.name !== category.name) {
                  await ctx.prisma.categoryInfoA113.update({ where: { id: dbData.id }, data: { ...category } });

                  updateCount += 1;
                } else ctx.prisma.categoryInfoA113.create({ data: category }).then(() => (createCount += 1));

                cursor += 1;
              }
              break;

            case "A112":
              for (let category of args.data.map((v) => v)) {
                console.log(`${cursor}번째 카테고리 작업중...`);

                const dbData = await ctx.prisma.categoryInfoA112.findUnique({ where: { code: category.code } });

                if (dbData && dbData.name !== category.name) {
                  await ctx.prisma.categoryInfoA112.update({ where: { id: dbData.id }, data: { ...category } });

                  updateCount += 1;
                } else ctx.prisma.categoryInfoA112.create({ data: category }).then(() => (createCount += 1));

                cursor += 1;
              }
              break;

            default:
              return throwError("존재하지 않는 오픈마켓코드 입니다.", ctx);
          }
          console.log({ totalCount });
          console.log({ createCount });
          console.log({ updateCount });
          console.timeEnd(`${info.fieldName} 소요시간`);

          return true;
        } catch (error) {
          console.log(error);
          console.timeEnd(`${info.fieldName} 소요시간`);

          return false;
        }
      },
    });
    /** 네이버 카테고리 매칭코드 변경 */
    t.field("updateCategoryInfoA077MatchingByAdmin", {
      type: nonNull("Boolean"),
      args: { data: nonNull(arg({ type: "UpdateCategoryInfoA077MatchingByAdminInput" })) },
      resolve: async (src: {}, args, ctx, info) => {
        let cursor = 0;

        try {
          /** 11번가_노말 */
          switch (args.data.shopCode) {
            case "A113":
              for (let codePair of args.data.categoryChanges) {
                console.log(`${cursor}번째 데이터 작업중...`);
                const updatedNaver = await ctx.prisma.categoryInfoA077.updateMany({
                  where: { codeA113: { equals: codePair.old } },
                  data: { codeA113: codePair.new },
                });
                console.log(`${updatedNaver.count}개의 네이버카테고리가 ${codePair.old} 에서 ${codePair.new} 로 변경되었습니다.\n`);

                cursor += 1;
              }
              break;

            /** 11번가_글로벌 */
            case "A112":
              for (let codePair of args.data.categoryChanges) {
                console.log(`${cursor}번째 데이터 작업중...`);
                const updatedNaver = await ctx.prisma.categoryInfoA077.updateMany({
                  where: { codeA112: { equals: codePair.old } },
                  data: { codeA112: codePair.new },
                });
                console.log(`${updatedNaver.count}개의 네이버카테고리가 ${codePair.old} 에서 ${codePair.new} 로 변경되었습니다.\n`);

                cursor += 1;
              }
              break;

            default:
              return throwError("존재하지않는 오픈마켓코드입니다", ctx);
          }

          return true;
        } catch (error) {
          console.log(error);

          return false;
        }
      },
    });
    /** 카테고리 삭제 */
    t.field("deleteCategoryInfoByAdmin", {
      type: "Int",
      args: { shopCode: nonNull(stringArg()), data: nonNull(list(nonNull(stringArg()))) },
      resolve: async (src: {}, args, ctx, info) => {
        console.log(`deleteCategoryInfoByAdmin accept, shopCode = ${args.shopCode}`);
        console.time(`processing time`);

        let deletedCount = 0;

        try {
          switch (args.shopCode) {
            case "A113":
              await ctx.prisma.categoryInfoA113.deleteMany({ where: { code: { in: args.data } } }).then((v) => (deletedCount += v.count));
              break;

            case "A112":
              await ctx.prisma.categoryInfoA112.deleteMany({ where: { code: { in: args.data } } }).then((v) => (deletedCount += v.count));
              break;

            default:
              return throwError("존재하지않는 오픈마켓코드입니다", ctx);
          }

          console.timeEnd(`processing time`);

          return deletedCount;
        } catch (error) {
          console.log(error);
          console.timeEnd(`processing time`);

          return null;
        }
      },
    });
  },
});
