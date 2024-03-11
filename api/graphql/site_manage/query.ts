import deepmerge from 'deepmerge';
import { arg, extendType, intArg, nonNull } from 'nexus';
import { errors, throwError } from '../../utils/error';

export const query_site_manage = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.string('getExcelSampleUrlBySomeone', {
			args: {
				type: nonNull(arg({ type: 'ExcelSampleEnum' })),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					if (args.type === 'COLLECT_PRODUCT') return 'data/셀포유 상품수집 양식.xlsx';
					else if (args.type === 'DENY_WORD') return 'data/셀포유 금지어 양식.xlsx';
					else if (args.type === 'REPLACE_WORD') return 'data/셀포유 치환 양식.xlsx';
					return '';
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
		t.crud.notices({
			alias: 'selectNoticesByEveryone',
			filtering: true,
			ordering: true,
			pagination: true,
		});
		t.field('selectNoticeByEveryone', {
			type: nonNull('Notice'),
			args: {
				noticeId: nonNull(intArg()),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let a = await ctx.prisma.notice.findUnique({ where: { id: args.noticeId } });
					if (!a) return throwError(errors.noSuchData, ctx);
					await ctx.prisma.notice.update({ where: { id: a.id }, data: { viewCount: { increment: 1 } } });
					return a;
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('selectNoticeCountByAdmin', {
			type: 'Int',
			args: {
				where: 'NoticeWhereInput',
			},
			resolve: async (src, args, ctx, info) => {
				try {
					return ctx.prisma.notice.count({ where: args.where as any });
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.crud.userQuestions({
			alias: 'selectUserQuestionBySomeone',
			filtering: true,
			ordering: true,
			pagination: true,
			resolve: async (src, args, ctx, info, ori) => {
				try {
					if (ctx.token!.userId) {
						args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
					}
					return ori(src, args, ctx, info);
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('selectUserQuestionCountBySomeone', {
			type: 'Int',
			args: {
				where: 'UserQuestionWhereInput',
			},
			resolve: async (src, args, ctx, info) => {
				try {
					if (ctx.token?.userId) {
						args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
					}
					return ctx.prisma.userQuestion.count({ where: args.where as any });
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
	},
});
