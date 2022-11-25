import { S3 } from 'aws-sdk';
import { FileUpload } from "graphql-upload";
import { AWS_BUCKET, isDev, regexPattern } from './constants';

import * as HTTP from 'http'

export const S3ADDRESS = process.env.S3ADDRESS;
export const EXTERNAL_S3_ADDRESS = process.env.EXTERNAL_S3_ADDRESS;

const agent = new HTTP.Agent({
    // Infinity is read as 50 sockets
    maxSockets: Infinity,
});

export const S3Client = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    params: { Bucket: AWS_BUCKET },
    region: 'ap-northeast-2',
    ...(isDev() ? { // minio용 설정
        endpoint: S3ADDRESS,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    } : {}),
    httpOptions: { agent }
});

export interface S3UploadResult {
    /**
     * Key
     */
    url: string;
    /**
     * Full Path
     */
    location: string;
}

export const uploadToS3 = async (file: FileUpload, path: (string | number)[] = [], filename?: string): Promise<S3UploadResult> => {
    let { createReadStream, filename: filenameOfFile, mimetype, encoding } = await file;

    path.push(filename ?? filenameOfFile);

    const stream = createReadStream();

    const response = await S3Client.upload({
        Key: path.join("/"),
        ACL: 'public-read',
        Body: stream,
        ContentType: mimetype,
        Bucket: AWS_BUCKET,
    }).promise();

    return {
        location: response.Location,
        url: response.Key
    }
}

export const checkFileExistAtS3 = async (Key: string): Promise<boolean> => {
    return await S3Client.headObject({ Key, Bucket: AWS_BUCKET, }).promise().then(() => true).catch(() => false);
}

export const getFromS3 = async (Key: string) => {
    return await S3Client.getObject({ Key, Bucket: AWS_BUCKET, }).promise();
}

export const deleteFromS3 = async (Key: string): Promise<boolean> => {
    return await S3Client.deleteObject({ Key, Bucket: AWS_BUCKET }).promise().then(result => result.$response.error ? false : true).catch(() => false);
}

export const deleteS3Folder = async (Key: string): Promise<boolean> => {
    try {
        var params = {
            Bucket: AWS_BUCKET,
            MaxKeys: 1000,
            Delimiter: '/',
            Prefix: Key
        };

        function listAllKeys() {
            let allKeys: any = [];

            return new Promise((res, rej) => {
                S3Client.listObjectsV2(params, async function (err: any, data: any) {
                    if (err) {
                        rej(err);
                    } else {
                        var contents = data.Contents;

                        for (let content in contents) {
                            allKeys.push(contents[content].Key);
                        }
                        res(allKeys);
                    }
                });
            })
        }

        const result: any = await listAllKeys();

        // console.log(`result ${Key} ${result}`);

        result.map((v: string) => {
            deleteFromS3(v);
        })

        return true;
    } catch (e) {
        return false;
    }
}

export const getProductListAllKeys = async (Key: string): Promise<any> => {
    try {
        var params = {
            Bucket: AWS_BUCKET,
            MaxKeys: 1000,
            Delimiter: '/',
            Prefix: Key
        };

        function listAllKeys() {
            let allKeys: any = [];
            return new Promise((res, rej) => { //callback함수 listObjectsV2 같은경우에는 new Promise로 비동기처리해줘야함.
                S3Client.listObjectsV2(params, async function (err: any, data: any) {
                    if (err) {
                        rej(err);
                    } else {
                        var contents = data.Contents;
                        //for in 구문은 자동으로 비동기처리가 됨 .
                        for (let content in contents) {
                            allKeys.push(contents[content].Key);
                        }
                        res(allKeys);
                    }
                });
            })
        }

        const result: any = await listAllKeys();

        return result;
    } catch (e) {
        return false;
    }
}

export const uploadToS3AvoidDuplicate = async (pfile: FileUpload, pathArray: (string | number)[], fileNameExcludeExtension?: string) => {
    const file = await pfile;
    
    let filename = fileNameExcludeExtension ? fileNameExcludeExtension + file.filename.replace(regexPattern.fileNameAndExtension, ".$2") : file.filename;
    let tmpnumber = 0;

    while (true) {
        const result = await checkFileExistAtS3(pathArray.concat(filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? (tmpnumber.toString()) : ""}.$2`)).join('/'));

        if (!result) break;

        tmpnumber += 1;
    }

    filename = filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? (tmpnumber.toString()) : ""}.$2`);
    filename = filename.replace("jpeg", "jpg");

    // console.log(filename);

    return (await uploadToS3(file, pathArray, filename)).url;
};

export const uploadToS3ByBuffer = async (file: Buffer, filename: string, mimetype: string, path: (string | number)[] = []): Promise<S3UploadResult> => {
    path.push(filename);

    const response = await S3Client.upload({
        Key: path.join("/"),
        ACL: 'public-read',
        Body: file,
        ContentType: mimetype,
        Bucket: AWS_BUCKET,
    }).promise();

    return {
        location: response.Location,
        url: response.Key
    }
}

export const uploadToS3AvoidDuplicateByBuffer = async (pfile: Buffer, filename: string, mimetype: string, pathArray: (string | number)[], fileNameExcludeExtension?: string) => {
    filename = fileNameExcludeExtension ? fileNameExcludeExtension + filename.replace(regexPattern.fileNameAndExtension, ".$2") : filename;

    let tmpnumber = 0;

    while (true) {
        const result = await checkFileExistAtS3(pathArray.concat(filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? (tmpnumber.toString()) : ""}.$2`)).join('/'));

        if (!result) break;

        tmpnumber += 1;
    }

    filename = filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? (tmpnumber.toString()) : ""}.$2`);

    return (await uploadToS3ByBuffer(pfile, filename, mimetype, pathArray)).url;
};

export const uploadToS3WithEditor = async (content: string, pathArray: (string | number)[], fileNameExcludeExtension: string | null) => {
    content = /<img[^>]src="([^">]+)"([^>]+)?>/g.test(content) ? content.replace(/<img[^>]src="([^">]+)"([^>]+)?>/g, `<img src="$1" />`) : content.replace(/<img[^>]+src="([^">]+)"([^>]+)?>/g, `<img src="$1" />`);
    const result = content.match(/<img src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g);

    // console.log('matched', result?.length);

    let descriptionContents = content;

    if (result) {
        const urlArray = await Promise.all(result.map(async (v, i) => {
            const a = v.replace(/<img src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g, "$1*$*~$2").split("*$*~");

            let [mimetype, buffer] = [a[0], Buffer.from(a[1], "base64")];

            let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

            if (ext === 'jpeg') {
                ext = 'jpg';
            }

            return await uploadToS3AvoidDuplicateByBuffer(buffer, `image${i}.${ext}`, mimetype, [...pathArray]);
        }));

        // console.log(urlArray);

        descriptionContents = result?.reduce((p, c, i) => p.replace(c, `<img src="${EXTERNAL_S3_ADDRESS}/${urlArray[i]}">`), descriptionContents);
    }

    descriptionContents = descriptionContents.replace(/(?<!<p ?>)(<img [^>]*?>)(?!<p>)/g, "<p>$1</p>");

    if (fileNameExcludeExtension) {
        const description = (await uploadToS3ByBuffer(Buffer.from(descriptionContents, "utf8"), `${fileNameExcludeExtension}.html`, 'text/html', [...pathArray])).url;

        return description;
    }

    return descriptionContents;
}