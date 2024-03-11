import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { errors, throwError } from '../../utils/error';
import { shopDataUrlInfo } from '../../playauto_api_type';

// const endpoint_kooza = "http://www.sellforyou.co.kr:3001/api/"

export const mutation_product_store_store = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('updateProductStoreUrlInfoBySomeone', {
			type: nonNull('String'),
			args: {
				productStoreId: nonNull(intArg()),
				storeProductId: nonNull(stringArg()),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					const productStore = await ctx.prisma.productStore.findUnique({
						where: { id: args.productStoreId },
						select: { storeProductId: true, userId: true, siteCode: true },
					});
					const userInfo = await ctx.prisma.userInfo.findUnique({
						where: { userId: ctx.token?.adminId ? productStore?.userId : ctx.token!.userId! },
					});
					if (!productStore) return throwError(errors.etc('해당 판매상품이 없습니다.'), ctx);
					if (ctx.token?.userId) {
						if (productStore.userId !== ctx.token.userId) return throwError(errors.forbidden, ctx);
					}
					if (!userInfo) return throwError(errors.etc('회원정보를 찾을 수 없습니다.'), ctx);

					await ctx.prisma.productStore.update({
						where: { id: args.productStoreId },
						data: {
							storeProductId: args.storeProductId,
							storeUrl: args.storeProductId
								? shopDataUrlInfo[productStore.siteCode]({
										id: args.storeProductId,
										storeFullPath: userInfo.naverStoreUrl,
									})
								: undefined,
						},
					});
					return '성공';
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
	},
});
