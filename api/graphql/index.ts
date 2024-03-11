import { decorateType, extendType, objectType } from 'nexus';
import { throwError } from '../utils/error';
import { GraphQLUpload } from 'graphql-upload';
import { isDev } from '../utils/constants';
import { getModifierString } from '../utils/helpers';
import { DateTimeResolver } from 'graphql-scalars';

export * from './user';
export * from './setting';
export * from './taobao_product';
export * from './product';
export * from './product_store';
export * from './category';
export * from './site_manage';
export * from './purchase';
export * from './admin';
export * from './word';
export * from './order';

export * from './auth';
export * from './enum';
export * from './siil';
export * from './tmp_test';
export * from './external_api';

export const Upload = decorateType(GraphQLUpload, {
	sourceType: 'FileUpload',
	asNexusMethod: 'upload',
});
export const DateTime = decorateType(DateTimeResolver, {
	sourceType: 'Date',
	asNexusMethod: 'date',
});

export const query_etc = extendType({
	type: 'Query',
	definition(t) {
		t.field('whoami', {
			type: 'String',
			resolve: async (src, args, ctx, info) => {
				try {
					if (isDev()) return getModifierString(ctx.token);

					if (ctx.token?.userId) return `User`;
					else if (ctx.token?.adminId) return `Admin`;
					else return 'Unknown';
				} catch (error) {
					return throwError(error, ctx);
				}
			},
		});
	},
});

export const t_token = objectType({
	name: 'SignInType',
	definition(t) {
		t.nonNull.string('accessToken');
		t.nonNull.string('refreshToken');
	},
});
