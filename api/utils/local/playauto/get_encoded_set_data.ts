import { getFromS3 } from "../../file_manage";
import * as iconv from "iconv-lite"
import { serialize } from 'php-serialize'

export async function getEncodedSetData(key: string) {
    const file = await getFromS3(key);
    const content = JSON.parse(file.Body!.toString("utf8"));
    Object.keys(content).map(key => {
        if (key.startsWith("b64")) {
            const buf = iconv.encode(content[key] as unknown as string, "euc-kr");
            const buf2 = Buffer.from((content[key]) as unknown as string);
            content[key] = encodeURIComponent(buf.toString("base64"));
        }
    });
    const result: { [key: string]: string; } = {
        name: content.name ?? "",
        mall_cate_name: content.mall_cate_name ?? "",
        content: content,
    };
    return Buffer.from(serialize(result)).toString("base64");
}