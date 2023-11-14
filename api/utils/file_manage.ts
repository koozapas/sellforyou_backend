import { S3 } from "aws-sdk";
import { FileUpload } from "graphql-upload";
import { AWS_BUCKET, isDev, regexPattern } from "./constants";

import * as HTTP from "http";

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
  region: "ap-northeast-2",
  ...(isDev()
    ? {
        // minio용 설정
        endpoint: S3ADDRESS,
        s3ForcePathStyle: true,
        signatureVersion: "v4",
      }
    : {}),
  httpOptions: { agent },
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
    ACL: "public-read",
    Body: stream,
    ContentType: mimetype,
    Bucket: AWS_BUCKET,
  }).promise();

  return {
    location: response.Location,
    url: response.Key,
  };
};

export const checkFileExistAtS3 = async (Key: string): Promise<boolean> => {
  return await S3Client.headObject({ Key, Bucket: AWS_BUCKET })
    .promise()
    .then(() => true)
    .catch(() => false);
};

export const getFromS3 = async (Key: string) => {
  return await S3Client.getObject({ Key, Bucket: AWS_BUCKET }).promise();
};

export const deleteFromS3 = async (Key: string): Promise<boolean> => {
  return await S3Client.deleteObject({ Key, Bucket: AWS_BUCKET })
    .promise()
    .then((result) => (result.$response.error ? false : true))
    .catch(() => false);
};

export const deleteS3Folder = async (Key: string): Promise<boolean> => {
  try {
    console.log(Key);
    var params = {
      Bucket: AWS_BUCKET,
      MaxKeys: 1000,
      Delimiter: "/",
      Prefix: Key,
    };

    function listAllKeys() {
      let allKeys: any = [];

      return new Promise((res, rej) => {
        S3Client.listObjectsV2(params, async function (err: any, data: any) {
          if (err) {
            rej(err);
          } else {
            var contents = data.Contents;
            console.log(data);
            for (let content in contents) {
              allKeys.push(contents[content].Key);
            }
            res(allKeys);
          }
        });
      });
    }

    const result: any = await listAllKeys();
    console.log(result);
    // console.log(`result ${Key} ${result}`);

    result.map((v: string) => {
      deleteFromS3(v);
    });

    return true;
  } catch (e) {
    return false;
  }
};

export const getProductListAllKeys = async (Key: string): Promise<any> => {
  try {
    var params = {
      Bucket: AWS_BUCKET,
      MaxKeys: 1000,
      Delimiter: "/",
      Prefix: Key,
    };

    function listAllKeys() {
      let allKeys: any = [];
      return new Promise((res, rej) => {
        //callback함수 listObjectsV2 같은경우에는 new Promise로 비동기처리해줘야함.
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
      });
    }

    const result: any = await listAllKeys();

    return result;
  } catch (e) {
    return false;
  }
};

export const uploadToS3AvoidDuplicate = async (pfile: FileUpload, pathArray: (string | number)[], fileNameExcludeExtension?: string) => {
  const file = await pfile;

  let filename = fileNameExcludeExtension
    ? fileNameExcludeExtension + file.filename.replace(regexPattern.fileNameAndExtension, ".$2")
    : file.filename;
  let tmpnumber = 0;

  while (true) {
    const result = await checkFileExistAtS3(
      pathArray.concat(filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? tmpnumber.toString() : ""}.$2`)).join("/")
    );

    if (!result) break;

    tmpnumber += 1;
  }

  filename = filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? tmpnumber.toString() : ""}.$2`);
  filename = filename.replace("jpeg", "jpg");
  // console.log(filename);

  return (await uploadToS3(file, pathArray, filename)).url;
};

export const uploadToS3ByBuffer = async (
  file: Buffer,
  filename: string,
  mimetype: string,
  path: (string | number)[] = []
): Promise<S3UploadResult> => {
  path.push(filename);

  const response = await S3Client.upload({
    Key: path.join("/"),
    ACL: "public-read",
    Body: file,
    ContentType: mimetype,
    Bucket: AWS_BUCKET,
  }).promise();

  return {
    location: response.Location,
    url: response.Key,
  };
};

/** AWS S3에 이미지업로드 및 중복된 파일명 피하기 */
export const uploadToS3AvoidDuplicateByBuffer = async (
  pfile: Buffer, // 1. Buffer 형태의 이미지 파일
  filename: string, // 2. 업로드할 이미지 파일의 원래 파일명
  mimetype: string, // 3. 이미지 파일의 MIME 타입 (예: "image/jpeg")
  pathArray: (string | number)[], // 4. 이미지를 업로드할 S3 경로를 나타내는 문자열 또는 숫자의 배열
  fileNameExcludeExtension?: string // 5. 파일명에서 확장자를 제외한 부분
) => {
  // 7. 파일명에 확장자를 추가하거나 변경
  filename = fileNameExcludeExtension ? fileNameExcludeExtension + filename.replace(regexPattern.fileNameAndExtension, ".$2") : filename;

  let tmpnumber = 0; // 8. 중복된 파일명에 붙일 숫자 초기화

  // 9. 중복된 파일명이 발견되지 않을 때까지 반복
  while (true) {
    // 10. S3에 해당 경로에 이미 파일이 있는지 확인
    const result = await checkFileExistAtS3(
      pathArray.concat(filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? tmpnumber.toString() : ""}.$2`)).join("/")
    );

    if (!result) break;

    tmpnumber += 1;
  }

  // 13. 중복을 피한 최종 파일명 생성
  filename = filename.replace(regexPattern.fileNameAndExtension, `$1${tmpnumber ? tmpnumber.toString() : ""}.$2`);

  return (await uploadToS3ByBuffer(pfile, filename, mimetype, pathArray)).url;
};

//기본적인 수집 이나 다른 기능에 의한 스타일 제거하여 이미지 업로드하는 기능
export const uploadToS3WithEditor = async (content: string, pathArray: (string | number)[], fileNameExcludeExtension: string | null) => {
  /** img태그에 잡다한 속성들 제거 */
  // content = /<img[^>]src="([^">]+)"([^>]+)?>/g.test(content) -> 기존정규식
  content = /<img(?: [^>]+)? src="([^">]+)"(?: [^>]+)?>/g.test(content)
    ? content.replace(/<img(?: [^>]+)? src="([^">]+)"(?: [^>]+)?>/g, `<img src="$1" />`)
    : content.replace(/<img[^>]+src="([^">]+)"([^>]+)?>/g, `<img src="$1" />`);
  // 제거전 : <img src="https://img.alicdn.com/imgextra/i1/2206899469007/O1CN01o0tJGL2GPGBjIXQrb_!!2206899469007.jpg" align="absmiddle"/>
  // 제거후 : <img src="https://img.alicdn.com/imgextra/i3/2206899469007/O1CN01oCShTU2GPGBiZ9UXG_!!2206899469007.jpg" />

  const result = content.match(/<img(?: align=".*")? src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g);

  let descriptionContents = content;

  if (result) {
    const urlArray = await Promise.all(
      result.map(async (v, i) => {
        const a = v.replace(/<img(?: align=".*")? src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g, "$1*$*~$2").split("*$*~");
        let [mimetype, buffer] = [a[0], Buffer.from(a[1], "base64")];
        let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

        if (ext === "jpeg") ext = "jpg";

        return await uploadToS3AvoidDuplicateByBuffer(buffer, `image${i}.${ext}`, mimetype, [...pathArray]);
      })
    );

    /** p컴포넌트의 스타일들을 제거하는 작업 */
    descriptionContents = result?.reduce(
      (p, c, i) => p.replace(c, `<img src="${EXTERNAL_S3_ADDRESS}/${urlArray[i]}">`),
      descriptionContents
    );
  }

  /** <p>태그로 감싸주는 작업? */
  descriptionContents = descriptionContents.replace(/(?<!<p ?>)(<img [^>]*?>)(?!<p>)/g, "<p>$1</p>");
  // 작업전 : <img src="https://img.alicdn.com/imgextra/i4/2206899469007/O1CN01QcNmhm2GPGBh013ty_!!2206899469007.jpg"/>
  // 작업후 : <p><img src="https://img.alicdn.com/imgextra/i4/2206899469007/O1CN01QcNmhm2GPGBh013ty_!!2206899469007.jpg"/></p>

  if (fileNameExcludeExtension) {
    const description = (
      await uploadToS3ByBuffer(Buffer.from(descriptionContents, "utf8"), `${fileNameExcludeExtension}.html`, "text/html", [...pathArray])
    ).url;
    return description;
  }
  return descriptionContents;
};

//descripition 셀포유에서 수정하는경우에는 img태그랑 p태그의 속성을 살려줘야하므로(상세에서 자유롭게 처리하는거 저장용도 )
export const uploadToS3WithEditor2 = async (content: string, pathArray: (string | number)[], fileNameExcludeExtension: string | null) => {
  //img태그에 잡다한 속성들 제거
  //content = /<img[^>]src="([^">]+)"([^>]+)?>/g.test(content) ? content.replace(/<img[^>]src="([^">]+)"([^>]+)?>/g, `<img src="$1" />`) : content.replace(/<img[^>]+src="([^">]+)"([^>]+)?>/g, `<img src="$1" />`);

  const result = content.match(/<img src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g);

  let descriptionContents = content;

  if (result) {
    const urlArray = await Promise.all(
      result.map(async (v, i) => {
        const a = v.replace(/<img src="?data:(image\/.*?);base64,(.*?)"? ?\/?>/g, "$1*$*~$2").split("*$*~");

        let [mimetype, buffer] = [a[0], Buffer.from(a[1], "base64")];
        let ext = mimetype.slice(mimetype.indexOf("/") + 1, 10);

        if (ext === "jpeg") ext = "jpg";

        return await uploadToS3AvoidDuplicateByBuffer(buffer, `image${i}.${ext}`, mimetype, [...pathArray]);
      })
    );

    /** p컴포넌트의 스타일들을 제거하는 작업 */
    descriptionContents = result?.reduce(
      (p, c, i) => p.replace(c, `<img src="${EXTERNAL_S3_ADDRESS}/${urlArray[i]}">`),
      descriptionContents
    );
  }
  // descriptionContents = descriptionContents.replace(/(?<!<p ?>)(<img [^>]*?>)(?!<p>)/g, "<p>$1</p>");

  if (fileNameExcludeExtension) {
    const description = (
      await uploadToS3ByBuffer(Buffer.from(descriptionContents, "utf8"), `${fileNameExcludeExtension}.html`, "text/html", [...pathArray])
    ).url;

    return description;
  }

  return descriptionContents;
};
