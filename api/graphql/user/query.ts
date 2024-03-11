import deepmerge from 'deepmerge';
import { extendType, list, nonNull } from 'nexus';
import { throwError } from '../../utils/error';

export const query_user = extendType({
	type: 'Query',
	definition(t) {
		t.field('selectMyInfoByUser', {
			type: nonNull('User'),
			resolve: async (src, args, ctx, info) => {
				try {
					const data = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
					return data!;
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
		t.field('selectUserLogsByUser', {
			type: nonNull(list(nonNull('UserLog'))),
			resolve: async (src, args, ctx, info) => {
				try {
					var result = await ctx.prisma.userLog.findMany({
						where: {
							userId: ctx.token!.userId!,
							createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
						},
						orderBy: {
							createdAt: 'desc',
						},
					});

					return result;
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.crud.users({
			alias: 'selectUsersByAdmin',
			filtering: true,
			ordering: true,
			pagination: true,
			resolve: async (src, args, ctx, info, ori) => {
				try {
					args.where = deepmerge<typeof args.where>(args.where, {
						id: { notIn: [224, 367, 487, 517, 549, 550, 578, 579, 587, 588, 597, 602] },
					});
					return ori(src, args, ctx, info);
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
		t.field('selectUsersCountByAdmin', {
			type: nonNull('Int'),
			args: {
				where: 'UserWhereInput',
			},
			resolve: async (src, args, ctx, info) => {
				try {
					return ctx.prisma.user.count({ where: args.where as any });
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
	},
});
