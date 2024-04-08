import { ApolloError } from 'apollo-server-express';
import { isBefore } from 'date-fns';
import { shield, rule, or } from 'graphql-shield';
import { NexusGenAllTypes } from '../typegen';
import { Context } from '../types';
import { isDev } from './constants';
import { getDebugInfo, throwError } from './error';
import { errors } from './error';

type IAdditionalInfo = NexusGenAllTypes['UserPurchaseAdditionalInfoEnumType'];

export const rules = {
	isAuthenticatedUser: (level: number, additionalInfoName?: IAdditionalInfo) =>
		rule({ cache: 'contextual' })(async (_parent, _args, ctx: Context) => {
			try {
				if (ctx.token === null) {
					return false;
				}
				if (ctx.token.isRefresh) return false;
				if (!ctx.token.userId) return false;
				if (level > 0) {
					if (!ctx.token.level) throw errors.higherLevelRequired;
					if (isBefore(new Date(ctx.token.level.exp * 1000), new Date())) throw errors.higherLevelRequired;
					if (ctx.token.level.level < level) throw errors.higherLevelRequired;
				} else if (additionalInfoName) {
					const d = ctx.token.additionalPerm?.find((v) => v.type === additionalInfoName);
					if (!d) return throwError(errors.additionalPermissionRequired, ctx);
					if (isBefore(new Date(d.exp * 1000), new Date())) throw errors.additionalPermissionRequired;
				}
				return true;
			} catch (e) {
				throw e;
			}
		}),
	isAuthenticatedAdmin: rule({ cache: 'contextual' })(async (_parent, _args, ctx: Context) => {
		try {
			if (ctx.token === null) {
				return false;
			}
			if (ctx.token.isRefresh) return false;
			if (!ctx.token.adminId) return false;
			return true;
		} catch (e) {
			throw e;
		}
	}),
	isAuthenticatedSomeone: rule({ cache: 'contextual' })(async (_parent, _args, ctx: Context) => {
		try {
			if (ctx.token === null) {
				return false;
			}
			if (ctx.token.isRefresh) return false;
			let user = ctx.token.userId;
			let admin = ctx.token.adminId;
			if (!user && !admin) return false;
			return true;
		} catch (e) {
			throw e;
		}
	}),
};

export const permissions = shield(
	{
		Query: {
			selectMyInfoByUser: rules.isAuthenticatedUser(0),

			// 1단계
			selectMyProductByUser: rules.isAuthenticatedUser(0),
			selectMyProductsCountByUser: rules.isAuthenticatedUser(0),
			getRegisterProductsDataByUser: rules.isAuthenticatedUser(1),

			// 2단계

			selectSiilInfoBySomeone: rules.isAuthenticatedSomeone,
			translateText: rules.isAuthenticatedSomeone,
			getExcelSampleUrlBySomeone: rules.isAuthenticatedSomeone,
			selectWordTablesBySomeone: rules.isAuthenticatedSomeone,
			selectUserQuestionBySomeone: rules.isAuthenticatedSomeone,
			selectProductsCountBySomeone: rules.isAuthenticatedSomeone,
			selectProductsBySomeone: rules.isAuthenticatedSomeone,

			selectProductsByAdmin: rules.isAuthenticatedAdmin,
			selectTaobaoProductsByAdmin: rules.isAuthenticatedAdmin,
			selectProductsCountByAdmin: rules.isAuthenticatedAdmin,
			selectTaobaoProductsCountByAdmin: rules.isAuthenticatedAdmin,
			selectMyProductByAdmin: rules.isAuthenticatedAdmin,
			selectUsersByAdmin: rules.isAuthenticatedAdmin,
			selectUsersCountByAdmin: rules.isAuthenticatedAdmin,
		},

		Mutation: {
			connectSocialIdByUser: rules.isAuthenticatedUser(0),
			updateMyDataByUser: rules.isAuthenticatedUser(0),
			changePasswordByUser: rules.isAuthenticatedUser(0),
			updatePhoneByUser: rules.isAuthenticatedUser(0),
			purchasePlanByUser: rules.isAuthenticatedUser(0),
			cancelPurchasePlanByUser: rules.isAuthenticatedUser(0),
			//withdrawByUser: rules.isAuthenticatedUser(0),
			addWordByUser: rules.isAuthenticatedUser(0),
			modifyWordByUser: rules.isAuthenticatedUser(0),
			deleteWordByUser: rules.isAuthenticatedUser(0),
			addWordByExcelByUser: rules.isAuthenticatedUser(0),
			createUserQuestionByUser: rules.isAuthenticatedUser(0),

			// 1단계
			getTaobaoItemUsingExtensionByUser: rules.isAuthenticatedUser(1),
			updateManyProductSiilInfoByUser: rules.isAuthenticatedUser(1),
			updateManyProductCategoryByUser: rules.isAuthenticatedUser(1),
			updateProductByUser: rules.isAuthenticatedUser(1),
			updateProductNameByUser: rules.isAuthenticatedUser(1),
			translateProductTextByUser: rules.isAuthenticatedUser(1),
			translateProductsTextByUser: rules.isAuthenticatedUser(1),
			endProductSellStateByUser: rules.isAuthenticatedUser(1),
			copyProductsByUser: rules.isAuthenticatedUser(1),

			// 2단계

			// 이미지 번역
			updateProductImageBySomeone: or(rules.isAuthenticatedUser(0), rules.isAuthenticatedAdmin),
			updateProductStoreUrlInfoBySomeone: or(rules.isAuthenticatedUser(0), rules.isAuthenticatedAdmin),

			updateCnyRateByAdmin: rules.isAuthenticatedAdmin,
			updateTaobaoRefreshDayByAdmin: rules.isAuthenticatedAdmin,
			signUpAdminByAdmin: rules.isAuthenticatedAdmin,
			changeMyPasswordByAdmin: rules.isAuthenticatedAdmin,
			createNoticeByAdmin: rules.isAuthenticatedAdmin,
			updateNoticeByAdmin: rules.isAuthenticatedAdmin,
			deleteNoticeByAdmin: rules.isAuthenticatedAdmin,
			updateUserQuestionByAdmin: rules.isAuthenticatedAdmin,
			// setPurchaseInfoByAdmin: rules.isAuthenticatedAdmin,
			invalidatePurchaseInfoByAdmin: rules.isAuthenticatedAdmin,
			updateProductByAdmin: rules.isAuthenticatedAdmin,
			updateProductNameByAdmin: rules.isAuthenticatedAdmin,
			updateManyProductCategoryByAdmin: rules.isAuthenticatedAdmin,
			updateManyProductSiilInfoByAdmin: rules.isAuthenticatedAdmin,
			deleteProductByAdmin: rules.isAuthenticatedAdmin,
			updateProductPriceByAdmin: rules.isAuthenticatedAdmin,
			endProductSellStateByAdmin: rules.isAuthenticatedAdmin,
			transferProductsToUserByAdmin: rules.isAuthenticatedAdmin,
			setMaxProductLimitByAdmin: rules.isAuthenticatedAdmin,
		},

		Subscription: {
			subscribeUserEvent: rules.isAuthenticatedUser(0),
		},
	},
	{
		fallbackError: async (thrownThing, parent, args, context, info) => {
			const ctx = context as unknown as Context;
			if (thrownThing instanceof ApolloError) {
				console.log(thrownThing);
				return thrownThing;
			} else if (thrownThing instanceof Error) {
				console.error(thrownThing, getDebugInfo(ctx));
				return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER');
			} else {
				if ((thrownThing !== null || parent !== undefined) && ctx.token !== null) {
					console.warn('The resolver threw something that is not an error.');
					console.warn(thrownThing, parent, args, getDebugInfo(ctx));
				}
				return errors.notAuthenticated;
			}
		},

		allowExternalErrors: isDev(),
		debug: isDev(),
	},
);
