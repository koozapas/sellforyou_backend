import { UserLog } from '@prisma/client';
import { withFilter } from 'apollo-server-express';
import { extendType } from 'nexus';
import { Context } from 'nexus-plugin-prisma/typegen';
import { throwError, errors } from '../../utils/error';
import { withCancel } from '../../utils/helpers';

export const subscription_user = extendType({
	type: 'Subscription',
	definition(t) {
		t.field('subscribeUserEvent', {
			type: 'UserLog',
			subscribe: withFilter(
				(root, args, ctx: Context) => {
					if (!ctx.token?.userId) return throwError(errors.etc('잘못된 접근입니다.'), null);
					return withCancel(ctx.pubsub.asyncIterator(`user_${ctx.token.userId}`), () => {});
				},
				(payload: UserLog, args: {}, ctx: Context, info) => {
					return ctx.token?.userId === payload.userId;
				},
			),
			resolve: async (payload: UserLog, args, ctx, info) => {
				try {
					return payload;
				} catch (error) {
					return throwError(error, ctx);
				}
			},
		});
	},
});
