import { enumType, intArg, nonNull, objectType, list } from 'nexus';
import { throwError } from '../../utils/error';

export const t_sitemanage_form_file = enumType({
	name: 'ExcelSampleEnum',
	members: ['COLLECT_PRODUCT', 'REPLACE_WORD', 'DENY_WORD'],
});

export const t_Notice = objectType({
	name: 'Notice',
	definition(t) {
		t.model.id();
		t.model.title();
		t.model.content();
		t.field('contentSummary', {
			type: nonNull('String'),
			args: {
				wordCount: intArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					const summary = src.content
						.replace(/<script.*?<\/script>/gs, '')
						.replace(/<style.*?<\/style>/gs, '')
						.replace(/&nbsp;/g, '')
						.replace(/<[^>]*>/gs, '')
						.replace(/\n/gs, '')
						.replace(/ +/gs, ' ')
						.trim();
					// console.log(src);
					return summary.slice(0, args.wordCount ?? undefined);
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
		t.model.attachmentFile();
		t.model.isVisible();
		t.model.viewCount();
		t.model.createdAt();
	},
});

export const t_UserQuestion = objectType({
	name: 'UserQuestion',
	definition(t) {
		t.model.id();
		t.model.userId();
		t.model.title();
		t.model.content();
		t.model.attachmentFile();
		t.field('attachmentFiles', {
			type: nonNull(list(nonNull('String'))),
			resolve: async (src, args, ctx, info) => {
				try {
					return await JSON.parse(src.attachmentFile ?? '[]');
				} catch (e) {
					return [];
				}
			},
		});
		t.model.answer();
		t.model.isActive();
		t.model.answeredAt();
		t.model.createdAt();
		t.model.user();
	},
});
