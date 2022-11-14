import { faIR } from "date-fns/locale";
import deepmerge from "deepmerge";
import { extendType, list, nonNull } from "nexus";
import { errors, throwError } from "../../utils/error";

import { uploadToS3AvoidDuplicate, uploadToS3AvoidDuplicateByBuffer, uploadToS3WithEditor,deleteFromS3,deleteS3Folder,getProductListAllKeys } from "../../utils/file_manage";

export const query_order = extendType({
    type: "Query",
    definition(t) {
        t.crud.orders({
            alias: "selectMyOrderByUser",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
                    //todoconsole.log("args.where = ",args.where);
                    // if (args.where?.state?.equals === null) {
                    //     args.where.state.equals = undefined;
                    // }
                    // if (args.where?.isImageTranslated?.equals === null) {
                    //     args.where.isImageTranslated.equals = undefined;
                    // }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});