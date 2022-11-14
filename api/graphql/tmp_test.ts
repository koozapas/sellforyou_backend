import { extendType, nonNull } from "nexus";
import { throwError } from "../utils/error";
import { getFromS3 } from "../utils/file_manage";
import { encode } from "base-64";
import { serialize } from 'php-serialize'
import * as iconv from "iconv-lite"
import { getEncodedSetData } from "../utils/local/playauto";

export const query_test_d = extendType({
    type: "Query",
    definition(t) {
        t.field("t_getEncodedSetInfo", {
            type: "String",
            resolve: async (src, args, ctx, info) => {
                try {
                    const key = "test/ex/1/set_info1.json";
                    return await getEncodedSetData(key);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("t_get", {
            type: "String",
            resolve: async (src, args, ctx, info) => {
                try {
                    return process.env.CODE_SECRET
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});

export const mutation_test_d = extendType({
    type: "Mutation",
    definition(t) {
        t.field("t_createProduct", {
            type: "Boolean",
            resolve: async (src, args, ctx, info) => {
                try {
                    return false;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});