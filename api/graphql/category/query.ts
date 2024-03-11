//category/query.ts
import { extendType, list, nonNull, stringArg } from 'nexus';
import { errors, throwError } from '../../utils/error';

export const query_category = extendType({
	type: 'Query',
	definition(t) {
		t.field('searchManyCategoryInfoA077BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: nonNull(list(nonNull(stringArg()))),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = await ctx.prisma.categoryInfoA077.findMany({
						where: {
							code: { in: args.code },
						},
						select: {
							code: true,
							name: true,
						},
					});

					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA077BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA077.findMany({
							where: {
								code: { contains: args.code },
							},
							select: {
								code: true,
								name: true,
								categoryInfoA001: { select: { code: true, name: true } },
								categoryInfoA006: { select: { code: true, name: true } },
								categoryInfoA027: { select: { code: true, name: true } },
								categoryInfoA112: { select: { code: true, name: true } },
								categoryInfoA113: { select: { code: true, name: true } },
								categoryInfoA524: { select: { code: true, name: true } },
								categoryInfoA525: { select: { code: true, name: true } },
								categoryInfoB378: { select: { code: true, name: true } },
								categoryInfoB719: { select: { code: true, name: true } },
								categoryInfoB956: { select: { code: true, name: true } },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA077.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoB378BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoB378.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoB378.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}

					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA112BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA112.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA112.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}

					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA027BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
				keyword: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA027.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA027.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA001BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA001.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA001.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA006BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA006.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA006.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoB719BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoB719.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoB719.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA113BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA113.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA113.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA524BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA524.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA524.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoA525BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoA525.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoA525.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});

		t.field('searchCategoryInfoB956BySomeone', {
			type: nonNull(list(nonNull('CategoryInformationType'))),
			args: {
				code: stringArg(),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					let result: any = [];

					if (args.code) {
						result = await ctx.prisma.categoryInfoB956.findMany({
							where: {
								code: { contains: args.code },
							},
							orderBy: { name: 'asc' },
						});
					}

					if (!args.code) {
						result = await ctx.prisma.categoryInfoB956.findMany({
							select: { code: true, name: true },
							orderBy: { name: 'asc' },
						});
					}
					if (result.length > 0) {
						return result;
					} else {
						return throwError(errors.etc('카테고리를 찾을 수 없습니다.'), ctx);
					}
				} catch (e) {
					return throwError(e, ctx);
				}
			},
		});
	},
});
