//onebound.ts
import { Prisma, PrismaClient, Product, TaobaoProduct, UserInfo } from "@prisma/client";
import { isBefore, sub } from "date-fns";
import fetch from "node-fetch";
import { IOBApiType, IOBItem, IOBItemGetParam, IOBItemGetResponse, IOBPublicParameter, IQueryParam } from "../../onebound_api_types";
import { ITranslateData } from "../../translate_types";
import { Context } from "../../types";
// import { EXTERNAL_ADDRESS, TRANSLATE_ITEM_SERVER } from "../constants";
import { errors, throwError } from "../error";
import { getFromS3, uploadToS3ByBuffer, uploadToS3WithEditor,uploadToS3AvoidDuplicateByBuffer } from "../file_manage";
import { wait } from "../helpers";
import { publishUserLogData } from "./pubsub";
import { calculatePrice } from './calculate-product-price';
import { join } from 'path'
import fs from 'fs/promises';

function delay (t: any, val: any) {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null, val), t);
    });
}

function raceAll(promises: any, timeoutTime: any, timeoutVal: any) {
    return Promise.all(promises.map((p: any) => {
        return Promise.race([p, delay(timeoutTime, timeoutVal)])
    }));
}

var axios = require('axios');

export const publicParam: IOBPublicParameter = {
    key: "tel17537715186",
    secret: "20201206",
}
const OB_API_URL = "https://api-gw.onebound.cn/taobao/";

export function getOBFetchUrl<T extends IQueryParam>(apiName: IOBApiType, params: T) {
    return OB_API_URL + apiName + "?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] ?? "")).join('&');
}
export interface IGetItemAndSaveOption {
    /**
     *카테고리 코드(입력시 해당 카테고리 자동 저장)
     *
     * @author Kuhave
     * @memberof IGetItemAndSaveOption
     */
    categoryCode?: string;
    /**
     *수집하는 그룹 아이디
     *
     * @author Kuhave
     * @memberof IGetItemAndSaveOption
     */
    collectGroupId?: number;
    /**
     *고시정보코드
     *
     * @author Kuhave
     * @memberof IGetItemAndSaveOption
     */
    siilCode?: string;
    /**
     * 무료회원여부
     * @author Kuhave
     * @memberof IGetItemAndSaveOption
     */
    isRestricted: boolean;
    /**
     * 관리자 작업 여부
     * @author Kuhave
     * @memberof IGetItemAndSaveOption
     */
    isAdmin: boolean;
}

export interface IFeeInfo {
    marginRate: number
    marginUnitType: string
    cnyRate: number
    defaultShippingFee: number
    extraShippingFee: number
    naverFee : number
    coupangFee : number
    streetFee :number
    streetNormalFee :number
    gmarketFee  :number
    auctionFee:number
    interparkFee :number
    wemakepriceFee :number
    lotteonFee:number
    lotteonNormalFee:number
    tmonFee :number
    naverAutoSearchTag : string
}

export const getTranslateData = (taobaoData: IOBItem, isTranslated?: boolean) => {
    //productOptionName 분석
    const firstPropertyInfo = taobaoData.skus.sku.length === 0 ? undefined : taobaoData.skus.sku[0]?.properties_name?.match(/[-\d]+?:[-\d]+?:(.+?):([^;]+);?/g)
    const res = firstPropertyInfo?.map((v, i) => {
        const result = v.match(/([-\d]+):[-\d]+:(.+):.*;?/);
        if (result) {
            return { taobaoPid: result[1], name: result[2] };
        }
        else throw new Error("파싱 중 문제 발생 " + JSON.stringify(taobaoData));
    });

    if (res) {
        //productOptionValue 분석
        const productOptionValues = Object.entries(taobaoData.props_list).map(([key, value]) => { // 직렬처리 필요?
            const a = key.match(/([-\d]+):([-\d]+)/)!;
            const b = value.match(/^(.+):(.+)$/)!;
            // 차례대로 1:2 : 3:4 라고 하면
            // a[1]:1, a[2] : 2, b[1] : 3, b[2] : 4
            const productOptionName = res.find(v => v.taobaoPid === a[1])!;
            return {
                name: b[2],
                taobaoVid: a[2],
                taobaoPid: productOptionName.taobaoPid,
            }
        });
        return { taobaoNumIid: taobaoData.num_iid, title: taobaoData.title, optionName: res, optionValue: productOptionValues, video: null, description: taobaoData.desc, isTranslated: isTranslated ?? false };

    }
    return { taobaoNumIid: taobaoData.num_iid, title: taobaoData.title, optionName: [], optionValue: [], video: null, description: taobaoData.desc, isTranslated: isTranslated ?? false };
}

export async function getItemAndSave(ctx: Context, taobaoIids: string[], option: IGetItemAndSaveOption) {}

export const getNameFromCookie = (cookie: string) => {
    const decodedCookie = Buffer.from(cookie, "base64").toString("utf8");
    //todoconsole.log(decodedCookie)
    let result = decodedCookie.match(/; lgc=(.*?)(; ?)|($)/);
    if (result) return result[1];
    result = decodedCookie.match(/; tracknick=(.*?)(; ?)|($)/);
    if (result) return result[1];
    result = decodedCookie.match(/; dnk=(.*?)(; ?)|($)/);
    if (result) return result[1];
    return null;
}

export const saveTaobaoItemToUser = async <T extends IFeeInfo>(prisma: PrismaClient, productCode: string | undefined, taobaoProducts: ((TaobaoProduct & { itemData: IOBItem, translateDataObject: ITranslateData | null }) | null)[], userId: number | null, userInfo: T, categoryCode?: string | null, categoryType?: string | null, adminId?: number, calculateWonType : number) => {

    const boundCalculatePrice = (cnyPrice: number, cnyRate: number, defaultShippingFee: number,calculateWonType:number) => 
    calculatePrice.bind(null, cnyPrice, userInfo.marginRate, userInfo.marginUnitType, cnyRate, defaultShippingFee,calculateWonType)();

    //todoconsole.log("calculatePrice = ", boundCalculatePrice);
    // 메모 const calculatePrice: any = (cnyPrice: string | number, marginRate: number, marginUnitType: string, cnyRate: number, shippingFee: number) => {
    //     if (marginUnitType === "WON") {
    //         return Math.round((Math.floor(parseFloat(cnyPrice.toString()) * cnyRate) + shippingFee + marginRate) / 100) * 100;
    //     } else {
    //         return Math.round((Math.floor(parseFloat(cnyPrice.toString()) * cnyRate) + shippingFee) * (100 + marginRate) / 10000) * 100;
    //     }
    // }
    return await Promise.all(taobaoProducts.filter((v): v is TaobaoProduct & { itemData: IOBItem, translateDataObject: ITranslateData | null } => v !== null).map(async v => {
        const taobaoData = v.itemData;
        const translateData = v.translateDataObject;
        let product = await prisma.product.findUnique({ where: { UQ_user_id_taobao_product_id: { taobaoProductId: v.id, userId: userId ?? 0 } } })//수집한적이있으면 
        //productOptionName 분석 옵션갯수인듯? 
        //console.log("taobaoData.skus.sku",taobaoData.skus.sku);//각 옵션의 가격, 속성, 속성이름, 남은수량, 옵션의 고유 카테고리 가 들어있음 
        const firstPropertyInfo = taobaoData.skus.sku.length === 0 ? undefined : taobaoData.skus.sku[0]?.properties_name?.match(/[-\d]+?:[-\d]+?:(.+?):([^;]+);?/g)
        if ((firstPropertyInfo?.length ?? 0) > 5) {
            throw new Error("옵션이 5개 이상인 상품은 수집이 불가합니다.");
        }

        const res = firstPropertyInfo?.map((v, i) => {
            const result = v.match(/([-\d]+):[-\d]+:(.+):.*;?/);
            //console.log("result = ",result);//예시 1627207:28338:颜色:蓝色;  
            // console.log("result[1] = ",result[1]);//예시 1627207
            // console.log("result[2] = ",result[2]);// 예시 颜色
            if (result) {
                return { taobaoPid: result[1], name: result[2], order: i + 1 };// 숫자 1 , 문자 2 , 
            }
            else throw new Error("파싱 중 문제 발생 " + JSON.stringify(taobaoData));
        });

        if (!product) {//수집한적이 없으면 
            //todoconsole.log("dsadfsadsaㅇ");
            var attribute = translateData?.attr ?? ""
            var description = (translateData?.description ?? taobaoData.desc).replace(/(?<!<p ?>)(<img [^>]*?>)(?!<p>)/g, "<p>$1</p>");
            //todoconsole.log("description = ",translateData?.description ?? taobaoData.desc);
            //<img src=https://img.alicdn.com/imgextra/i3/2170372256/O1CN01xzd4Sd1SXIGJRj64i_!!2170372256.jpg alt="" />
            
            //todoconsole.log("description 변환후  = ",description);
            //<p><img src=https://img.alicdn.com/imgextra/i3/2170372256/O1CN01xzd4Sd1SXIGJRj64i_!!2170372256.jpg alt="" /></p> 가됨
            let code = 0;
            let price = parseFloat(taobaoData.price);

            if (isNaN(price)) price = 0;

            let cnyRate = 0;
            let defaultShippingFee = 0;
            //todoconsole.log("taobaoData.shop_id = ",taobaoData.shop_id);
            if (taobaoData.shop_id === "express"  ) {
                for (var i in taobaoData.props) {
                    if (taobaoData.props[i].default) {
                        code = parseInt(i);

                        break;
                    }
                }
                cnyRate = 1;
                defaultShippingFee = taobaoData.props[code].value;
            } else {
                cnyRate = userInfo.cnyRate;
                defaultShippingFee = userInfo.defaultShippingFee;
            }

            price = boundCalculatePrice(price, cnyRate, defaultShippingFee,calculateWonType);

            if (isNaN(price)) price = 0;
            
            let searchTags = ""
            let title_list = translateData?.title.split(" ") ?? [];
            searchTags = title_list.filter((item,index)=> title_list.indexOf(item)===index).filter(v=>v.trim().length>0).join()
            
            let categories: any = {};
            
            if (categoryCode) {
                if (categoryType === 'c') {
                    let result_b378 = await prisma.categoryInfoB378.findUnique({ where: { code: categoryCode }});//아마 타오바오?
                
                    if(result_b378 !== null) { //없을때 예외처리 
                        let result_a077 = await prisma.categoryInfoA077.findUnique({ where: { code: result_b378?.codeA077 }});//아마 네이버

                        if(result_a077 !== null) {
                            let result_a112 = await prisma.categoryInfoA112.findUnique({ where: { code: result_a077?.codeA112 }});//각 네이버 기준의 카테고리들
                            let result_a113 = await prisma.categoryInfoA113.findUnique({ where: { code: result_a077?.codeA113 }});//각 네이버 기준의 카테고리들
                            let result_a027 = await prisma.categoryInfoA027.findUnique({ where: { code: result_a077?.codeA027 }});//각 네이버 기준의 카테고리들
                            let result_a001 = await prisma.categoryInfoA001.findUnique({ where: { code: result_a077?.codeA001 }});//각 네이버 기준의 카테고리들
                            let result_a006 = await prisma.categoryInfoA006.findUnique({ where: { code: result_a077?.codeA006 }});//각 네이버 기준의 카테고리들
                            let result_b719 = await prisma.categoryInfoB719.findUnique({ where: { code: result_a077?.codeB719 }});//각 네이버 기준의 카테고리들
                            let result_a524 = await prisma.categoryInfoA524.findUnique({ where: { code: result_a077?.codeA524 }});//각 네이버 기준의 카테고리들
                            let result_a525 = await prisma.categoryInfoA525.findUnique({ where: { code: result_a077?.codeA525 }});//각 네이버 기준의 카테고리들
                            let result_b956 = await prisma.categoryInfoB956.findUnique({ where: { code: result_a077?.codeB956 }});//각 네이버 기준의 카테고리들
                        
                            categories['A077'] = result_a077?.code;
                            categories['A077_name'] = result_a077?.name;

                            categories['B378'] = result_b378?.code;
                            categories['B378_name'] = result_b378?.name;
            
                            categories['A112'] = result_a112?.code;
                            categories['A112_name'] = result_a112?.name;
            
                            categories['A113'] = result_a113?.code;
                            categories['A113_name'] = result_a113?.name;
            
                            categories['A027'] = result_a027?.code;
                            categories['A027_name'] = result_a027?.name;
            
                            categories['A001'] = result_a001?.code;
                            categories['A001_name'] = result_a001?.name;
            
                            categories['A006'] = result_a006?.code;
                            categories['A006_name'] = result_a006?.name;
            
                            categories['B719'] = result_b719?.code;
                            categories['B719_name'] = result_b719?.name;
            
                            categories['A524'] = result_a524?.code;
                            categories['A524_name'] = result_a524?.name;
            
                            categories['A525'] = result_a525?.code;
                            categories['A525_name'] = result_a525?.name;
            
                            categories['B956'] = result_b956?.code;
                            categories['B956_name'] = result_b956?.name;
                        }
                    }
                } 
                
                if (categoryType === 'n') {
                    let result_a077 = await prisma.categoryInfoA077.findUnique({ where: { code: categoryCode }});//아마 네이버
                
                    if(result_a077 !== null) {
                        let result_b378 = await prisma.categoryInfoB378.findUnique({ where: { code: result_a077?.codeB378 }});//각 네이버 기준의 카테고리들
                        let result_a112 = await prisma.categoryInfoA112.findUnique({ where: { code: result_a077?.codeA112 }});//각 네이버 기준의 카테고리들
                        let result_a113 = await prisma.categoryInfoA113.findUnique({ where: { code: result_a077?.codeA113 }});//각 네이버 기준의 카테고리들
                        let result_a027 = await prisma.categoryInfoA027.findUnique({ where: { code: result_a077?.codeA027 }});//각 네이버 기준의 카테고리들
                        let result_a001 = await prisma.categoryInfoA001.findUnique({ where: { code: result_a077?.codeA001 }});//각 네이버 기준의 카테고리들
                        let result_a006 = await prisma.categoryInfoA006.findUnique({ where: { code: result_a077?.codeA006 }});//각 네이버 기준의 카테고리들
                        let result_b719 = await prisma.categoryInfoB719.findUnique({ where: { code: result_a077?.codeB719 }});//각 네이버 기준의 카테고리들
                        let result_a524 = await prisma.categoryInfoA524.findUnique({ where: { code: result_a077?.codeA524 }});//각 네이버 기준의 카테고리들
                        let result_a525 = await prisma.categoryInfoA525.findUnique({ where: { code: result_a077?.codeA525 }});//각 네이버 기준의 카테고리들
                        let result_b956 = await prisma.categoryInfoB956.findUnique({ where: { code: result_a077?.codeB956 }});//각 네이버 기준의 카테고리들
                    
                        categories['A077'] = result_a077?.code;
                        categories['A077_name'] = result_a077?.name;

                        categories['B378'] = result_b378?.code;
                        categories['B378_name'] = result_b378?.name;
        
                        categories['A112'] = result_a112?.code;
                        categories['A112_name'] = result_a112?.name;
        
                        categories['A113'] = result_a113?.code;
                        categories['A113_name'] = result_a113?.name;
        
                        categories['A027'] = result_a027?.code;
                        categories['A027_name'] = result_a027?.name;
        
                        categories['A001'] = result_a001?.code;
                        categories['A001_name'] = result_a001?.name;
        
                        categories['A006'] = result_a006?.code;
                        categories['A006_name'] = result_a006?.name;
        
                        categories['B719'] = result_b719?.code;
                        categories['B719_name'] = result_b719?.name;
        
                        categories['A524'] = result_a524?.code;
                        categories['A524_name'] = result_a524?.name;
        
                        categories['A525'] = result_a525?.code;
                        categories['A525_name'] = result_a525?.name;
        
                        categories['B956'] = result_b956?.code;
                        categories['B956_name'] = result_b956?.name;
                    }
                }
            }

            let immSearchTagsData ="";
            if(userInfo.naverAutoSearchTag ==='Y'){
                async function example() {
                    try {
                      const data = await fs.readFile(join(__dirname,"dictionary.json"), { encoding: 'utf8' });
                      return JSON.parse(data);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                let dictData = await example();
                let matchDictionaryData :any={}
                let ttt : any = Object.entries(dictData);
                  
                Object.entries(dictData).filter(([index,data]) => {
                    const tagInfo : any = data;
                    if(tagInfo.code === categories['A077'])  matchDictionaryData=tagInfo.tagJson;})//빨간줄무시
                    //이거 이렇게 데이터 안넣어주고 filter결과만 넣으면 filter형식으로 return되서 필요한 데이터가 안나와서 이렇게 처리함
                    let matchTagOb= [];
                    let matchTagNm :any= [];
                    matchTagOb = matchDictionaryData.event.concat(matchDictionaryData.target,matchDictionaryData.hot,matchDictionaryData.emotion);
                    matchTagOb.map((data : any)=>matchTagNm.push(data.tagNm));
        
                    function shuffle(array :any) {
                        var m = array.length,
                          t,
                          i
                        // While there remain elements to shuffle…
                        while (m) {
                          // Pick a remaining element…
                          i = Math.floor(Math.random() * m--)
                          // And swap it with the current element.
                          t = array[m]
                          array[m] = array[i]
                          array[i] = t
                        }
                        return array
                      }
                     matchTagNm = shuffle(matchTagNm)
                     immSearchTagsData= matchTagNm.slice(0,10).join();
                }

                const regex = /[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/]/gim; 
            product = await prisma.product.create({
                data: {
                    name: taobaoData.nick !== "" ? taobaoData.nick : translateData?.title ?? taobaoData.title,
                    description,
                    price,
                    shippingFee: userInfo.extraShippingFee,
                    userId : userId,
                    adminId : adminId,
                    taobaoProductId: v.id,

                    // categoryCode: categoryCode,

                    categoryA077: categories['A077'],

                    categoryB378: categories['B378'],

                    categoryA112: categories['A112'],

                    categoryA027: categories['A027'],

                    categoryA001: categories['A001'],

                    categoryA006: categories['A006'],

                    categoryA113: categories['A113'],

                    categoryB719: categories['B719'],

                    categoryA524: categories['A524'],

                    categoryA525: categories['A525'],

                    categoryB956: categories['B956'],

                    siilCode: null,
                    imageThumbnailData: JSON.stringify(taobaoData.item_imgs.map(v => "https:" + v.url.replace(/^https?:/, ""))),
                    productCode: "",
                    marginRate: userInfo.marginRate,
                    marginUnitType: userInfo.marginUnitType,
                    cnyRate: cnyRate,
                    localShippingFee: defaultShippingFee,
                    localShippingCode: code,
                    searchTags: taobaoData.desc_short !== "" ? taobaoData.desc_short.replace(regex, "") : searchTags.replace(regex, ""),
                    immSearchTags : immSearchTagsData !== "" ? immSearchTagsData : null,
                    naverFee   : userInfo.naverFee  ,
                    coupangFee : userInfo.coupangFee  ,
                    streetFee   : userInfo.streetFee  ,
                    streetNormalFee   : userInfo.streetNormalFee  ,
                    gmarketFee    : userInfo.gmarketFee   ,
                    auctionFee  : userInfo.auctionFee ,
                    interparkFee   : userInfo.interparkFee  ,
                    wemakepriceFee   : userInfo.wemakepriceFee  ,
                    lotteonFee  : userInfo.lotteonFee ,
                    lotteonNormalFee  : userInfo.lotteonNormalFee ,
                    tmonFee   : userInfo.tmonFee  ,
                    attribute : attribute,
                    brandName : taobaoData.brand !== "" ?  taobaoData.brand  : undefined ,
                    manuFacturer : taobaoData.manufacturer !== "" ?  taobaoData.manufacturer :undefined,
                    modelName : taobaoData.modelName !== "" ?  taobaoData.modelName  :undefined,
                },
            });
            //todoconsole.log("product",product);
            // VVIC Thumbnails/Descriptions Upload todo 1 
            //todoconsole.log("taobaoData.shop_id",taobaoData.shop_id);
            if (taobaoData.shop_id === 'vvic') {
               //todo console.log("taobaoData.item_imgs",taobaoData.item_imgs.length);
                if (taobaoData.item_imgs.length > 0) {
                    var new_imgs = await raceAll(taobaoData.item_imgs.map(async(v, i) => {
                        try{let image_resp: any = await axios.get(v.url, {responseType: 'arraybuffer'});
                        let image_raw = Buffer.from(image_resp.data).toString('base64');
                        let image_base64 = "data:" + image_resp.headers["content-type"] + ";base64," + image_raw;

                        const res = image_base64.match(/data:(image\/.*?);base64,(.*)/);

                        if (product && res) {
                            const [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                            
                            var image_ext = mimetype.slice(mimetype.indexOf("/") + 1, mimetype.length);

                            if (image_ext === 'jpeg') {
                                image_ext = 'jpg';
                            }

                            var image_url : any = `https://img.sellforyou.co.kr/sellforyou/${await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail${(i + 1).toString().padStart(2, '0')}.${image_ext}`, mimetype, ["product", product.id])}`;

                            return {
                                "url": image_url
                            };
                        }

                        return {
                            "url": ""
                        };}
                        catch(e){ return null;}
                        
                    }), 5000, null);

                    if (new_imgs.length > 0) {
                        var sorted_imgs = new_imgs.sort(function compare(a: any, b: any) {
                            if ( a.url < b.url ) {
                                return -1;
                            }

                            if ( a.url > b.url ) {
                                return 1;
                            }

                            return 0;
                        });

                        taobaoData.item_imgs = sorted_imgs;
                    }
                }
                var test_desc_imgs :any = [];
                if (translateData && taobaoData.desc_img.length > 0) {
                    var desc_imgs = await raceAll(taobaoData.desc_img.map(async(v, i) => {
                        try{let image_resp: any = await axios.get(v, {responseType: 'arraybuffer'}); 
                    
                        let image_raw = Buffer.from(image_resp.data).toString('base64');
                        let image_base64 = "data:" + image_resp.headers["content-type"] + ";base64," + image_raw;
    
                        const res = image_base64.match(/data:(image\/.*?);base64,(.*)/);
    
                        if (product && res) {
                            const [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                            
                            var image_ext = mimetype.slice(mimetype.indexOf("/") + 1, mimetype.length);

                            if (image_ext === 'jpeg') {
                                image_ext = 'jpg';
                            }

                            const output = `https://img.sellforyou.co.kr/sellforyou/${await uploadToS3AvoidDuplicateByBuffer(buffer, `description${(i + 1).toString().padStart(2, '0')}.${image_ext}`, mimetype, ["product", product.id])}`;
                            test_desc_imgs.push(output);

                            if (translateData) {
                                    translateData.description = translateData.description.replace(v, output)
                            }

                            return output;
                        }
                    }
                        catch(e){
                            return null;
                        }

                    }), 5000, null);

                    // if(desc_imgs.length > 0 && desc_imgs[0] === null && test_desc_imgs.length > 0){
                    //     desc_imgs = test_desc_imgs;
                    // }
                    if (desc_imgs.length > 0) {
                        description = (translateData?.description ?? taobaoData.desc).replace(/(?<!<p ?>)(<img [^>]*?>)(?!<p>)/g, "<p>$1</p>");
                    }
                }
                
                product = await prisma.product.update({
                    where: { 
                        id: product.id 
                    },
                    data: { 
                        description,
                        imageThumbnailData: JSON.stringify(taobaoData.item_imgs.map(v => v.url)),
                    }
                });
            }
            description = await uploadToS3WithEditor(description, ["product", product.id], "description") 
            //todoconsole.log("dsad");
            product = await prisma.product.update({
                where: { 
                    id: product.id 
                },
                data: { 
                    productCode: productCode ?? `SFY${adminId ? "A" : ""}_` + product.id.toString(36) ,
                    description 
                }
            });
            //todoconsole.log("product dsad",product);//여기까지 문제없음 

            //todoconsole.log("res",res);
            if (res) { //옵션 있는 상품의 경우
                const productOptionNames = await Promise.all(res!.map(async function (v) {
                        const name = translateData?.optionName.find(v2 => v2.taobaoPid === v.taobaoPid)?.name ?? v.name;//이름 번역한거만 바꾸네.. 다른건 외국어쓰네 ;; 
                        //todoconsole.log("name",name);
                        const urlInfo = taobaoData.prop_imgs.prop_img.find(v2 => v2.properties.split(":")[0] === v.taobaoPid);
                        //todoconsole.log("옵션있는상품",v);
                        const productOptionName =await prisma.productOptionName.create({ data: { taobaoPid : v.taobaoPid , order : v.order , hasImage: !!urlInfo, productId: product!.id, name } });
                        //todoconsole.log("productOptionName",productOptionName);//문제없고 
                        return productOptionName;
                    }));

                //productOptionValue 분석
                var cnt = 1;

                const propsLengthInfo = Object.keys(taobaoData.props_list).map(v => v.match(/([-\d]+):([-\d]+)/)![1]).reduce((p, c) => {//p번째 c갯수 
                    // console.log(cnt,"번째");
                    // cnt++;
                    // console.log("p =",p);
                    // console.log("c =",c);
                   
                    const index = p.findIndex(v => v.l === c);//-1이면 없고 , 0이면 0번째있고 , 1이면 ....해당번째  보니까 v.l의 c는 갯수이고 각 옵션의 갯수를 세는거네 
                    // console.log("index =",index);
                    if (index !== -1) {//해당 pid번호가 있으면 
                        p[index].c = p[index].c + 1;// 해당 
                        // console.log(`${cnt} 번째 ${p[index].c}`);
                    }
                    else {//해당 pid번호가 없을때. index2 = -1  
                        const index2 = p.findIndex(v => v.l === ""); //하나는 분명 있음(옵션은 최대 3개)  ? 이게아니고 이건 옵션이 없는경우인데 ; 없을때도 카운트1개올리네 ?흠 .이건왜하노 
                        //todoconsole.log("index2=",index2);
                        p[index2].l = c;
                        p[index2].c = 1;
                    }
                    //todoconsole.log("p=",p);
                    return p;
                }, [{ l: "", c: 0 }, { l: "", c: 0 }, { l: "", c: 0 },{ l: "", c: 0 },{ l: "", c: 0 },] as { l: string, c: number }[])
                //todoconsole.log("propsLengthInfo=",propsLengthInfo); //[ { l: '20509', c: 5 }, { l: '1627207', c: 4 }, { l: '', c: 0 } ]
                    // 1 번째
                    // p = [ { l: '', c: 0 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 20509
                    // index = -1
                    // 2 번째
                    // p = [ { l: '20509', c: 1 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 20509
                    // index = 0
                    // 3 번째 2
                    // 3 번째
                    // p = [ { l: '20509', c: 2 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 20509
                    // index = 0
                    // 4 번째 3
                    // 4 번째
                    // p = [ { l: '20509', c: 3 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 20509
                    // index = 0
                    // 5 번째 4
                    // 5 번째
                    // p = [ { l: '20509', c: 4 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 20509
                    // index = 0
                    // 6 번째 5
                    // 6 번째
                    // p = [ { l: '20509', c: 5 }, { l: '', c: 0 }, { l: '', c: 0 } ]
                    // c = 1627207
                    // index = -1
                    // 7 번째
                    // p = [ { l: '20509', c: 5 }, { l: '1627207', c: 1 }, { l: '', c: 0 } ]
                    // c = 1627207
                    // index = 1
                    // 8 번째 2
                    // 8 번째
                    // p = [ { l: '20509', c: 5 }, { l: '1627207', c: 2 }, { l: '', c: 0 } ]
                    // c = 1627207
                    // index = 1
                    // 9 번째 3
                    // 9 번째
                    // p = [ { l: '20509', c: 5 }, { l: '1627207', c: 3 }, { l: '', c: 0 } ]
                    // c = 1627207
                    // index = 1
                    // 10 번째 4

                    //이건 무슨짓이고? //[ { l: '20509', c: 5 }, { l: '1627207', c: 4 }, { l: '', c: 0 } ] 에서 
                propsLengthInfo[4].c = propsLengthInfo[3].c + propsLengthInfo[2].c + propsLengthInfo[1].c + propsLengthInfo[0].c; //추가함 
                propsLengthInfo[3].c = propsLengthInfo[2].c + propsLengthInfo[1].c + propsLengthInfo[0].c; //추가함 
                propsLengthInfo[2].c = propsLengthInfo[1].c + propsLengthInfo[0].c;
                propsLengthInfo[1].c = propsLengthInfo[0].c;
                propsLengthInfo[0].c = 0;
                //todoconsole.log("이건무슨짓이고?",propsLengthInfo);
                // 일케 바꼇네 ?
                // [
                //     { l: '20509', c: 0 },
                //     { l: '1627207', c: 5 },
                //     { l: '', c: 9 },
                //   ] 머시여! 왜 count를 이렇게 바꾼겨 \

                
                const productOptionValues = await Promise.all(Object.entries(taobaoData.props_list).map(async ([key, value], i) => { // 직렬처리 필요?
                    const a = key.match(/([-\d]+):([-\d]+)/)!;
                    const b = value.match(/^(.+):(.+)$/)!;
                    //console.log("A[]이 뭐지",a);// 아 루프한번씩 다도네 갯수만큼  
                    // [
                    //     '20509:3727387',
                    //     '20509',a[1]
                    //     '3727387',a[2]
                    //     index: 0,
                    //     input: '20509:3727387',
                    //     groups: undefined
                    //   ]
                    //console.log("b이 뭐지",b);//[ '尺码:4XL', '尺码', '4XL', index: 0, input: '尺码:4XL', groups: undefined ]
                    
                    // 차례대로 1:2 : 3:4 라고 하면
                    // a[1]:1, a[2] : 2, b[1] : 3, b[2] : 4
                    const productOptionName = productOptionNames.find(v => v.taobaoPid === a[1])!;
                    const urlInfo = taobaoData.prop_imgs.prop_img.find(v => v.properties === key);
                    const name = translateData?.optionValue.find(v2 => v2.taobaoPid === a[1] && v2.taobaoVid === a[2])?.name ?? b[2];//매칭시켜버림 옵션명과 옵션내용 
                    //console.log("a 의 name",name);//각 옵션이름이네 ex) 붉은색, 푸른색,, 등 
                    //todoconsole.log("name = ? ",name);
                    let image: any = urlInfo ? /^https?:\/\//.test(urlInfo.url) ? urlInfo.url : ("http://" + urlInfo.url) : null;

                    image = image !== null ? image.replace(/^https?:\/\/\/\//, "http://") : image;

                    var temp = i - propsLengthInfo.find(v => v.l === a[1])!.c + 1;// 루프돌면서 1 2 3 4 5 1 2 3 4 출력됬음 
                    //todoconsole.log("temp = ",temp);//여기까지문제없다 

                    if (taobaoData.shop_id === 'vvic' && image) {
                        image = await Promise.race([new Promise(async (resolve, reject) => {
                            try {
                                let image_resp = await axios.get(image, {responseType: 'arraybuffer'});
                                let image_raw = Buffer.from(image_resp.data).toString('base64');
                                let image_base64 = "data:" + image_resp.headers["content-type"] + ";base64," + image_raw;
        
                                const res = image_base64.match(/data:(image\/.*?);base64,(.*)/);
        
                                if (product && res) {
                                    const [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                                    
                                    var image_ext = mimetype.slice(mimetype.indexOf("/") + 1, mimetype.length);
        
                                    if (image_ext === 'jpeg') {
                                        image_ext = 'jpg';
                                    }
        
                                    resolve(`https://img.sellforyou.co.kr/sellforyou/${await uploadToS3AvoidDuplicateByBuffer(buffer, `option${(i + 1).toString().padStart(2, '0')}.${image_ext}`, mimetype, ["product", product.id])}`);
                                }
                            } catch (e: any) {
                                console.log(e);

                                reject(null);
                            }
                        }), delay(5000, null)])
                    }

                    return await prisma.productOptionValue.create({
                        data: {
                            name,
                            originalName: name,
                            image,
                            optionNameOrder: productOptionName.order,
                            taobaoVid: a[2],
                            productOptionNameId: productOptionName.id,
                            number: temp,
                        }
                    });
                }));

                //console.log("productOptionValues = ", productOptionValues);//여기까진 잘들어왔는디?
                await Promise.all(taobaoData.skus.sku.map(async sku => {
                    //const match = sku.properties.match(/^([-\d]+):([-\d]+);?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?/)!; 옵션3개 
                    //const match = sku.properties.match(/^([-\d]+):([-\d]+);?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?/)!; //옵션4개로변경 
                    const match = sku.properties.match(/^([-\d]+):([-\d]+);?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?;?([-\d]+)?:?([-\d]+)?/)!; //옵션5개로변경 
                    //product_option table의 option_string 컬럼 varchar(10) -> varchar(20)으로수정 
                    const optionString = [
                        productOptionValues.find(v => v.optionNameOrder === 1 && v.taobaoVid === match[2])!.number,
                        productOptionValues.find(v => v.optionNameOrder === 2 && v.taobaoVid === match[4])?.number,
                        productOptionValues.find(v => v.optionNameOrder === 3 && v.taobaoVid === match[6])?.number,
                        productOptionValues.find(v => v.optionNameOrder === 4 && v.taobaoVid === match[8])?.number,
                        productOptionValues.find(v => v.optionNameOrder === 5 && v.taobaoVid === match[10])?.number,
                    ].filter((v): v is number => typeof v === 'number').map(v => ("00" + v).slice(-2)).join('_');
                    //console.log("optionString = ",optionString);
                    //console.log("test = id ",productOptionValues.find(v => v.optionNameOrder === 4 && v.taobaoVid === match[8])?.id );
                    const option = await prisma.productOption.create({
                        data: {
                            productId: product!.id,
                            optionValue1Id: productOptionValues.find(v => v.optionNameOrder === 1 && v.taobaoVid === match[2])!.id,
                            optionValue2Id: productOptionValues.find(v => v.optionNameOrder === 2 && v.taobaoVid === match[4])?.id,
                            optionValue3Id: productOptionValues.find(v => v.optionNameOrder === 3 && v.taobaoVid === match[6])?.id,
                            optionValue4Id: productOptionValues.find(v => v.optionNameOrder === 4 && v.taobaoVid === match[8])?.id,
                            optionValue5Id: productOptionValues.find(v => v.optionNameOrder === 4 && v.taobaoVid === match[10])?.id,
                            defaultShippingFee : defaultShippingFee,
                            taobaoSkuId: sku.sku_id,
                            priceCny: parseFloat(sku.price),
                            price: taobaoData.shop_id === "express"  ? boundCalculatePrice(parseFloat(sku.price), 1, taobaoData.props[code].value,calculateWonType) : boundCalculatePrice(parseFloat(sku.price), cnyRate, defaultShippingFee,calculateWonType),
                            stock: parseInt(sku.quantity ?? "0"),
                            optionString : optionString 
                        }
                    });
                    //console.log("option =",option);
                    return option;
                }));
            }
        }

        return product;
    }))
}