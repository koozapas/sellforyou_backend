//productStore/query.ts
import { GraphQLResolveInfo } from 'graphql';
import { extendType, intArg, list, nonNull, stringArg } from 'nexus';
import { Context } from 'nexus-plugin-prisma/typegen';
import { ArgsValue } from 'nexus/dist/typegenTypeHelpers';
import { predefinedSiilData } from '..';
import { shopDataNameInfo, IPADShopInfo, IPADataDataSet10 } from '../../playauto_api_type';
// import { EXTERNAL_ADDRESS } from "../utils/constants";
import { errors, throwError } from '../../utils/error';
import { EXTERNAL_S3_ADDRESS, EXTERNAL_S3_ADDRESS2, getFromS3 } from '../../utils/file_manage';
import { getOptionHeaderHtmlByProductId } from '../../utils/local/playauto';
interface IPADataImagePartial {
	img1: string;
	img2: string;
	img3: string;
	img4: string;
	img5: string;
	img6: string;
	img7: string;
	img8: string;
	img9: string;
	img10: string;
	img1_blob: string;
	img2_blob: string;
	img3_blob: string;
	img4_blob: string;
	img5_blob: string;
	img6_blob: string;
	img7_blob: string;
	img8_blob: string;
	img9_blob: string;
	img10_blob: string;
}

interface IQueryAdminArg {
	adminId: number;
	targetUserId: number;
}

//변경 3

function byteLength(str: string) {
	let strLen = str.length;
	let cnt = 0;
	let oneChar = '';

	for (let i = 0; i < strLen; i++) {
		oneChar = str.charAt(i);

		if (escape(oneChar).length > 4) {
			cnt += 2;
		} else {
			cnt++;
		}
	}

	return cnt;
}

function byteSlice(str: string, limit: number) {
	while (true) {
		let blen;

		blen = byteLength(str);

		if (blen > limit) {
			str = str.slice(0, str.length - 1);
		} else {
			return str;
		}
	}
}

const truncateOptionNameInternal = (siteCode: string, text: string) => {
	// replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, "")
	switch (siteCode) {
		case 'A077':
			return text.replace(/[\\*?"<>]/g, '').slice(0, 25); //스마트스토어
		case 'B378':
			return text.slice(0, 30); //쿠팡
		case 'A112':
			return text.replace(/[',"%&<>#†\\∏‡]/g, '').slice(0, 25); //11번가
		case 'A113':
			return text.replace(/[',"%&<>#†\\∏‡]/g, '').slice(0, 25); //11번가
		case 'A006':
			return byteSlice(text, 40); //G marget
		case 'A001':
			return text.replace(/[\[\]\^,'"\\@&;]/g, '').slice(0, 25); //auction
		case 'A027':
			return text.replace(/[^[\]a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\- ]/g, '').slice(0, 25); //interpark
		case 'B719':
			return text.slice(0, 25); //wemake
		case 'A524':
			return text.slice(0, 25); //lotteon
		case 'A525':
			return text.slice(0, 25); //lotteon
		case 'B956':
			return text.slice(0, 25); //tmon developing
		default:
			return text.slice(0, 25);
	}
};

// const truncateOptionName = <T extends IWordTable>(siteCode: string, text: string, wordTable: T[]) => replaceWordTable(truncateOptionNameInternal(siteCode, text), wordTable)
// export function getValidUploadImageUrl(image: string) {
//     if (!/^https?:\/\//.test(image) && image !== "") {
//         image = `${EXTERNAL_S3_ADDRESS}/${encodeURI(image)}`;
//     }
//     if (/^https:\/\//.test(image)) {
//         image = image.replace(/^https/, "http");
//     }
//     return image;
// }

//변경 2

const truncateOptionName = (siteCode: string, text: string) => truncateOptionNameInternal(siteCode, text);
// const truncateOptionName = <T extends IWordTable>(siteCode: string[], text: string, wordTable: T[]) =>  replaceWordTable(truncateOptionNameInternal(siteCode, text),wordTable)

// const truncateOptionName = <T extends IWordTable>(siteCode: string[], text: string, wordTable: T[]) =>
// {
//     const tmpTruncateOptionNameInternal : any = truncateOptionNameInternal(siteCode, text)

//     const result : any = [] ;
//     tmpTruncateOptionNameInternal.map((v:any) => {
//         result.push(replaceWordTable(v, wordTable))
//     })

//     return result;
// }

export function getValidUploadImageUrl(image: string, shopName: any) {
	if (!/^https?:\/\//.test(image) && image !== '') {
		image = `${image.includes('img2') ? EXTERNAL_S3_ADDRESS2 : EXTERNAL_S3_ADDRESS}/${encodeURI(image)}`;
	}

	if (!shopName.includes('amazon')) {
		if (/^https:\/\//.test(image)) {
			image = image.replace(/^https/, 'http');
		}
	}
	return image;
}

const registerProductResolver =
	(data: IQueryAdminArg | null) =>
	async (
		src: {},
		args: ArgsValue<'Query', 'getRegisterProductsDataByUser'>,
		ctx: Context,
		info: GraphQLResolveInfo,
	) => {
		const siteCode = args.siteCode;
		console.log('등록', siteCode);
		const adminId = data?.adminId ?? null;
		try {
			if (args.productIds.length === 0) return throwError(errors.etc('상품 ID를 입력하세요.'), ctx);
			const product2 = await ctx.prisma.product.findMany({
				where: { id: { in: args.productIds } },
				include: {
					productStore: true,
					taobaoProduct: true,
					productOption: {
						where: { isActive: true },
						orderBy: [{ optionString: 'asc' }],
						include: {
							productOption1: { include: { productOptionName: true } },
							productOption2: { include: { productOptionName: true } },
							productOption3: { include: { productOptionName: true } },
							productOption4: { include: { productOptionName: true } },
							productOption5: { include: { productOptionName: true } },
						},
					},
					productOptionName: {
						orderBy: [{ order: 'asc' }],
						include: { productOptionValue: { orderBy: [{ number: 'asc' }] } },
					},
				},
			});
			if (product2.length !== args.productIds.length) return throwError(errors.etc('상품 ID를 확인하세요.'), ctx);
			const userId = data ? data.targetUserId : ctx.token!.userId!;
			if (!adminId && !product2.every((v) => v.userId === userId))
				return throwError(errors.etc('자신의 상품 ID를 입력하세요.'), ctx);
			const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId: userId } });

			if (!userInfo) return throwError(errors.etc('해당 유저가 없습니다.'), ctx);

			//변경 1
			if (siteCode.includes('A077') && !/^https?:\/\/smartstore.naver.com\//.test(userInfo.naverStoreUrl)) {
				console.log(
					userInfo,
					userInfo.naverStoreUrl,
					/^https?:\/\/smartstore.naver.com\//.test(userInfo.naverStoreUrl),
				);
				return throwError(
					errors.etc(
						'스마트스토어 설정 값이 없거나 주소 형태(https://smartstore.naver.com/아이디)가 아닙니다. 해당 설정값 수정 후 재시도해주세요.',
					),
					ctx,
				);
			}

			const product = product2;

			const wordTable = await ctx.prisma.wordTable.findMany({ where: { userId: userId } });

			//금지어 적용
			const productStoreCheck = await Promise.all(
				product.map(async (v) => {
					try {
						v.productOption.map((v2) => {
							return {
								opt1: truncateOptionName(
									siteCode[0],
									('00' + v2.productOption1.number).slice(-2) + ' ' + v2.productOption1.name,
								), //옵션타입1의 옵션명
								opt2: truncateOptionName(
									siteCode[0],
									v2.productOption2?.name
										? ('00' + v2.productOption2.number).slice(-2) + ' ' + v2.productOption2.name
										: '',
								), //옵션타입2의 옵션명
								opt3: truncateOptionName(
									siteCode[0],
									v2.productOption3?.name
										? ('00' + v2.productOption3.number).slice(-2) + ' ' + v2.productOption3.name
										: '',
								), //옵션타입3의 옵션명
								opt4: truncateOptionName(
									siteCode[0],
									v2.productOption4?.name
										? ('00' + v2.productOption4.number).slice(-2) + ' ' + v2.productOption4.name
										: '',
								), //옵션타입4의 옵션명
								opt5: truncateOptionName(
									siteCode[0],
									v2.productOption5?.name
										? ('00' + v2.productOption5.number).slice(-2) + ' ' + v2.productOption5.name
										: '',
								), //옵션타입5의 옵션명
								misc1: truncateOptionName(siteCode[0], v2.productOption1.productOptionName.name), //옵션타입 1의 명칭
								misc2: truncateOptionName(siteCode[0], v2.productOption2?.productOptionName.name ?? ''), //옵션타입 2의 명칭
								misc3: truncateOptionName(siteCode[0], v2.productOption3?.productOptionName.name ?? ''), //옵션타입 3의 명칭
								misc4: truncateOptionName(siteCode[0], v2.productOption4?.productOptionName.name ?? ''), //옵션타입 4의 명칭
								misc5: truncateOptionName(siteCode[0], v2.productOption5?.productOptionName.name ?? ''), //옵션타입 5의 명칭
							};
						});
						// replaceWordTable(v.name, wordTable);
					} catch (e) {
						const a = e as Error;
						return `${v.productCode} 상품에서 ${a.message}`;
					}
					return v;
				}),
			);

			if (productStoreCheck.filter((v) => typeof v === 'string').length > 0) {
				return throwError(
					errors.etc(
						`요청하신 상품 중 설정한 금지단어가 포함된 상품이 있어서 작업이 중단되었습니다.\n${productStoreCheck
							.filter((v): v is string => typeof v === 'string')
							.join('\n')}`,
					),
					ctx,
				);
			}
			const productStore = productStoreCheck
				.filter(<T>(v: T): v is Exclude<T, string> => typeof v !== 'string')
				.map((v) => ({ product: v })); //이게 그냥 모든정보네

			try {
				// job_json type 설정
				const job_json_array: any = [];

				const data = await ctx.prisma.userInfo.findUnique({
					where: {
						userId: ctx.token!.userId!,
					},
				});
				if (!data) return throwError(errors.etc('no token'), ctx);
				const calculateWonType = parseInt(data.calculateWonType);

				await Promise.all(
					siteCode.map(async (vSiteCode: string, index: number) => {
						const job_json: { DShopInfo: IPADShopInfo<IPADataDataSet10> } = {
							DShopInfo: {
								action: [10], //작업 기본정보 RegistProd(상품등록)
								account_code: 'SFY', //업체코드 또는 업체 ID(발급받아서 입력해주세요)
								site_code: vSiteCode, //쇼핑몰 코드
								dll_code: vSiteCode, //dll 코드(쇼핑몰 코드와 동일)
								site_name: shopDataNameInfo[vSiteCode], //쇼핑몰 이름
								encoding: 'utf-8', //인코딩 방식
								id: '', //쇼핑몰 아이디
								pw: '', //쇼핑몰 비밀번호
								etc: '',
								etc2: '',
								etc3: '',
								etc4: '',
								etc5: '',
								etc6: '',
								id2: '',
								dummy1: 9999,
								global_yn: '1', //해외쇼핑몰 여부 -> 무조건 1
								prod_codes: productStore.map((v) => v.product.productCode), // 마스터 상품코드(작업대상 상품별 고유 코드)
								//각 작업별 데이터 (DataDataSet)
								DataDataSet: {
									api: productStore.map((v) => ({
										// amp_key: "",
										amp_program_code: '',
										amp_program_type: '',
										amp_program_homedir: '',
										amp_program_homeurl: '',
									})),
									//옵션데이터 todo
									data_opt: productStore
										.map((v: any, i: number) => {
											//여기부터

											//상품판매가 계산
											let price = Math.round(v.product.price / calculateWonType) * calculateWonType;
											//console.log("start test22");

											if (vSiteCode === 'A077') {
												//스마트스토어 할인금액 설정
												const productPrice = Math.round(v.product.price / calculateWonType) * calculateWonType;
												const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
												const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;

												if (v.product.productOption.some((v2: any) => v2.price < minRange || v2.price > maxRange)) {
													//판매가 범위 밖이면
													price = Math.min(
														...v.product.productOption.map(
															(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
														),
													); //실제상품가격 = 최저옵션가
												}
											}

											if (
												vSiteCode === 'A112' ||
												vSiteCode === 'A113' ||
												vSiteCode === 'A001' ||
												vSiteCode === 'A006' ||
												vSiteCode === 'A522' ||
												vSiteCode === 'A523'
											) {
												//console.log("start test33");
												if (v.product.productOption.length !== 0) {
													if (userInfo?.defaultPrice === 'M') {
														//기준가 중간가
														let minPrice = Math.min(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														let maxPrice = Math.max(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														let middlePrice = (maxPrice + minPrice) / 2;
														let priceList = [];
														priceList.push(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														let middleLowPrice = [];
														for (var i = 0; i < priceList.length; i++) {
															if (priceList[i] <= middlePrice) {
																middleLowPrice.push(priceList[i]);
															}
														}
														price = Math.max(...middleLowPrice);
														//console.log("test444",price);
													} else {
														// 기준가 최저가
														price = Math.min(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														); //실제상품가격 = 최저옵션가
													}
												}
											}

											//todo
											const a = v.product.productOption.map((v2: any, index2: number) => {
												const image =
													v2.productOption1.image ?? v2.productOption2?.image ?? v2.productOption3?.image ?? null;

												let opt_price = Math.round((v2.price - price) / calculateWonType) * calculateWonType;

												if (vSiteCode === 'A077') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.naverFee !== null ? v.product.naverFee : userInfo?.naverFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'B378') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.coupangFee !== null ? v.product.coupangFee : userInfo?.coupangFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A112') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.streetFee !== null ? v.product.streetFee : userInfo?.streetFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A001' || vSiteCode === 'A522') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.auctionFee !== null ? v.product.auctionFee : userInfo?.auctionFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A006' || vSiteCode === 'A523') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.gmarketFee !== null ? v.product.gmarketFee : userInfo?.gmarketFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A027') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 -
																	(v.product.interparkFee !== null
																		? v.product.interparkFee
																		: userInfo?.interparkFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A113') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 -
																	(v.product.streetNormalFee !== null
																		? v.product.streetNormalFee
																		: userInfo?.streetNormalFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'B719') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 -
																	(v.product.wemakepriceFee !== null
																		? v.product.wemakepriceFee
																		: userInfo?.wemakepriceFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A524') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.lotteonFee !== null ? v.product.lotteonFee : userInfo?.lotteonFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'A525') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 -
																	(v.product.lotteonNormalFee !== null
																		? v.product.lotteonNormalFee
																		: userInfo?.lotteonNormalFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												} else if (vSiteCode === 'B956') {
													opt_price =
														Math.floor(
															(opt_price /
																(100 - (v.product.tmonFee !== null ? v.product.tmonFee : userInfo?.tmonFee))) *
																(100 / calculateWonType),
														) * calculateWonType;
												}

												let opt_price_original = opt_price;

												if (
													userInfo.discountAmount &&
													userInfo.discountAmount > 0 &&
													userInfo.discountUnitType !== 'WON'
												) {
													opt_price_original =
														Math.round(opt_price / (1 - userInfo.discountAmount / 100) / calculateWonType) *
														calculateWonType;
												}

												switch (userInfo.optionIndexType) {
													case 2: {
														return {
															//todo
															number: 0, //옵션별 고유코드 0 //TODO:무슨 역할인지 물어보기
															type: 'SELECT', //옵션 종류
															code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
															manage_code: `SFY_${v.product.id.toString(36)}_${v2.id.toString(36)}`, //관리코드
															opt1: truncateOptionName(vSiteCode, v2.productOption1.name), //옵션타입1의 옵션명
															opt2: truncateOptionName(
																vSiteCode,
																v2.productOption2?.name ? v2.productOption2.name : '',
															), //옵션타입2의 옵션명
															opt3: truncateOptionName(
																vSiteCode,
																v2.productOption3?.name ? v2.productOption3.name : '',
															), //옵션타입3의 옵션명
															opt4: truncateOptionName(
																vSiteCode,
																v2.productOption4?.name ? v2.productOption4.name : '',
															), //옵션타입3의 옵션명
															opt5: truncateOptionName(
																vSiteCode,
																v2.productOption5?.name ? v2.productOption5.name : '',
															), //옵션타입3의 옵션명
															price: opt_price, //옵션 추가 가격
															wprice: opt_price_original,
															stock: v2.stock ?? 0, //옵션 수량
															soldout: 0, //품절 여부
															wdate: '2020-11-27 08:59:40', //등록일자
															misc1: truncateOptionName(vSiteCode, v2.productOption1.productOptionName.name), //옵션타입 1의 명칭
															misc2: truncateOptionName(vSiteCode, v2.productOption2?.productOptionName.name ?? ''), //옵션타입 2의 명칭
															misc3: truncateOptionName(vSiteCode, v2.productOption3?.productOptionName.name ?? ''), //옵션타입 3의 명칭
															misc4: truncateOptionName(vSiteCode, v2.productOption4?.productOptionName.name ?? ''), //옵션타입 3의 명칭
															misc5: truncateOptionName(vSiteCode, v2.productOption5?.productOptionName.name ?? ''), //옵션타입 3의 명칭
															weight: '0', //추가무게
															optimg: image ? getValidUploadImageUrl(image, v.product.taobaoProduct.shopName) : null, //옵션 이미지}
															barcode_user: '',
														};
													}

													default: {
														return {
															number: 0, //옵션별 고유코드 0 //TODO:무슨 역할인지 물어보기
															type: 'SELECT', //옵션 종류
															code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
															manage_code: `SFY_${v.product.id.toString(36)}_${v2.id.toString(36)}`, //관리코드
															opt1: truncateOptionName(
																vSiteCode,
																('00' + v2.productOption1.number).slice(-2) + '. ' + v2.productOption1.name,
															), //옵션타입1의 옵션명
															opt2: truncateOptionName(
																vSiteCode,
																v2.productOption2?.name
																	? ('00' + v2.productOption2.number).slice(-2) + '. ' + v2.productOption2.name
																	: '',
															), //옵션타입2의 옵션명
															opt3: truncateOptionName(
																vSiteCode,
																v2.productOption3?.name
																	? ('00' + v2.productOption3.number).slice(-2) + '. ' + v2.productOption3.name
																	: '',
															), //옵션타입3의 옵션명
															opt4: truncateOptionName(
																vSiteCode,
																v2.productOption4?.name
																	? ('00' + v2.productOption4.number).slice(-2) + '. ' + v2.productOption4.name
																	: '',
															), //옵션타입3의 옵션명
															opt5: truncateOptionName(
																vSiteCode,
																v2.productOption5?.name
																	? ('00' + v2.productOption5.number).slice(-2) + '. ' + v2.productOption5.name
																	: '',
															), //옵션타입3의 옵션명
															price: opt_price, //옵션 추가 가격
															wprice: opt_price_original,
															stock: v2.stock ?? 0, //옵션 수량
															soldout: 0, //품절 여부
															wdate: '2020-11-27 08:59:40', //등록일자
															misc1: truncateOptionName(vSiteCode, v2.productOption1.productOptionName.name), //옵션타입 1의 명칭
															misc2: truncateOptionName(vSiteCode, v2.productOption2?.productOptionName.name ?? ''), //옵션타입 2의 명칭
															misc3: truncateOptionName(vSiteCode, v2.productOption3?.productOptionName.name ?? ''), //옵션타입 3의 명칭
															misc4: truncateOptionName(vSiteCode, v2.productOption4?.productOptionName.name ?? ''), //옵션타입 4의 명칭
															misc5: truncateOptionName(vSiteCode, v2.productOption5?.productOptionName.name ?? ''), //옵션타입 5의 명칭
															weight: '0', //추가무게
															optimg: image ? getValidUploadImageUrl(image, v.product.taobaoProduct.shopName) : null, //옵션 이미지}
															barcode_user: '',
														};
													}
												}
											});
											return a;
										})
										.flat(), //여기까지 ... todo
									data_set: [],
									// 세트 데이터
									data_slave: [],
									data: await Promise.all(
										productStore.map(async (v) => {
											// console.log("카테고리", v.product.category);
											// if (setDataJson.Category1 === "") throw new Error("세트 정보에 카테고리 데이터가 없습니다. 세트에 카테고리 데이터를 입력해주세요.")

											const images = JSON.parse(v.product.imageThumbnailData) as string[];
											const imageInfo = new Array(10)
												.fill(0)
												.map((_, i): Partial<IPADataImagePartial> | null => {
													if (i > 9) {
														return null;
													}

													let a: Partial<IPADataImagePartial> = {};
													let image = images[i] ?? '';

													if (i === 0 && image === '') {
														image = 'http://prog2.playauto.co.kr/junho/test.png';
													}

													image = getValidUploadImageUrl(image, v.product.taobaoProduct.shopName);

													a[('img' + (i + 1)) as keyof IPADataImagePartial] = image;
													a[('img' + (i + 1) + '_blob') as keyof IPADataImagePartial] = image;

													return a;
												})
												.filter((v): v is Partial<IPADataImagePartial> => v !== null)
												.reduce((p, c) => ({ ...p, ...c })) as IPADataImagePartial;

											//상품판매가 계산
											let price = Math.round(v.product.price / calculateWonType) * calculateWonType;

											//카테고리 및 고시정보
											const siil_data = v.product.siilCode
												? JSON.stringify(predefinedSiilData.find((v2) => v2.infoCode === v.product.siilCode)!)
												: JSON.stringify(predefinedSiilData.find((v2) => v2.infoCode === '35')!);
											//카테고리 고시정보
											let cate1 = '';
											let cate2 = '';
											let cate3 = '';
											let cate4 = '';
											let cate_code = '';
											let cate_code2 = '';
											let finalCategory = '';

											if (vSiteCode === 'A077') {
												if (!v.product.categoryA077) {
													return throwError(errors.etc('스마트스토어 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA077;
											}

											if (vSiteCode === 'B378') {
												if (!v.product.categoryB378) {
													return throwError(errors.etc('쿠팡 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryB378;
											}

											if (vSiteCode === 'A112') {
												if (!v.product.categoryA112) {
													return throwError(errors.etc('11번가 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA112;
											}

											if (vSiteCode === 'A027') {
												if (!v.product.categoryA027) {
													return throwError(errors.etc('인터파크 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA027;
											}

											if (vSiteCode === 'A001' || vSiteCode === 'A522') {
												if (!v.product.categoryA001) {
													return throwError(errors.etc('옥션 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA001;
											}

											if (vSiteCode === 'A006' || vSiteCode === 'A523') {
												if (!v.product.categoryA006) {
													return throwError(errors.etc('G마켓 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA006;
											}

											if (vSiteCode === 'B719') {
												if (!v.product.categoryB719) {
													return throwError(errors.etc('위메프 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryB719;
											}

											if (vSiteCode === 'A113') {
												if (!v.product.categoryA113) {
													return throwError(errors.etc('11번가 일반 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA113;
											}

											if (vSiteCode === 'A524') {
												if (!v.product.categoryA524) {
													return throwError(errors.etc('롯데온 글로벌 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA524;
											}

											if (vSiteCode === 'A525') {
												if (!v.product.categoryA525) {
													return throwError(errors.etc('롯데온 일반 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryA525;
											}

											if (vSiteCode === 'B956') {
												if (!v.product.categoryB956) {
													return throwError(errors.etc('티몬 카테고리가 설정되지 않았습니다.'), ctx);
												}

												cate_code = v.product.categoryB956;
											}

											cate1 = '';
											cate2 = '';
											cate3 = '';
											cate4 = '';

											// 쇼핑몰별 세트데이터 전처리
											let discount = 0;

											if (vSiteCode === 'A077') {
												//스마트스토어 할인금액 설정
												const productPrice = Math.round(v.product.price / calculateWonType) * calculateWonType;
												const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
												const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;
												if (v.product.productOption.some((v2) => v2.price < minRange || v2.price > maxRange)) {
													//판매가 범위 밖이면
													const max = Math.max(
														...v.product.productOption.map(
															(v2) => Math.round(v2.price / calculateWonType) * calculateWonType,
														),
													); //problem
													const min = Math.min(
														...v.product.productOption.map(
															(v2) => Math.round(v2.price / calculateWonType) * calculateWonType,
														),
													); //problem
													discount = Math.round(((max - min) * 2) / calculateWonType) * calculateWonType - min;
													price = Math.round(((max - min) * 2) / calculateWonType) * calculateWonType;
												}
											}

											if (
												vSiteCode === 'A112' ||
												vSiteCode === 'A113' ||
												vSiteCode === 'A001' ||
												vSiteCode === 'A006' ||
												vSiteCode === 'A522' ||
												vSiteCode === 'A523'
											) {
												//console.log("start test33");
												if (v.product.productOption.length !== 0) {
													if (userInfo?.defaultPrice === 'M') {
														//기준가 중간가
														let minPrice = Math.min(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														//console.log("MinPrice",minPrice);
														let maxPrice = Math.max(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														let middlePrice = (maxPrice + minPrice) / 2;
														let priceList = [];
														priceList.push(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														);
														let middleLowPrice = [];
														for (var i = 0; i < priceList.length; i++) {
															if (priceList[i] <= middlePrice) {
																middleLowPrice.push(priceList[i]);
															}
														}
														price = Math.max(...middleLowPrice);
														//console.log("test444",price);
													} else {
														// 기준가 최저가
														price = Math.min(
															...v.product.productOption.map(
																(v2: any) => Math.round(v2.price / calculateWonType) * calculateWonType,
															),
														); //실제상품가격 = 최저옵션가
														//console.log("price",price);
													}
												}
											}

											if (vSiteCode === 'A077') {
												price =
													Math.ceil(
														(price / (100 - (v.product.naverFee !== null ? v.product.naverFee : userInfo?.naverFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.floor(
														(discount /
															(100 - (v.product.naverFee !== null ? v.product.naverFee : userInfo?.naverFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'B378') {
												price =
													Math.ceil(
														(price /
															(100 - (v.product.coupangFee !== null ? v.product.coupangFee : userInfo?.coupangFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 - (v.product.coupangFee !== null ? v.product.coupangFee : userInfo?.coupangFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A112') {
												price =
													Math.ceil(
														(price /
															(100 - (v.product.streetFee !== null ? v.product.streetFee : userInfo?.streetFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 - (v.product.streetFee !== null ? v.product.streetFee : userInfo?.streetFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A027') {
												price =
													Math.ceil(
														(price /
															(100 -
																(v.product.interparkFee !== null ? v.product.interparkFee : userInfo?.interparkFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 -
																(v.product.interparkFee !== null ? v.product.interparkFee : userInfo?.interparkFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A001' || vSiteCode === 'A522') {
												price =
													Math.ceil(
														(price /
															(100 - (v.product.auctionFee !== null ? v.product.auctionFee : userInfo?.auctionFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 - (v.product.auctionFee !== null ? v.product.auctionFee : userInfo?.auctionFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A006' || vSiteCode === 'A523') {
												price =
													Math.ceil(
														(price /
															(100 - (v.product.gmarketFee !== null ? v.product.gmarketFee : userInfo?.gmarketFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 - (v.product.gmarketFee !== null ? v.product.gmarketFee : userInfo?.gmarketFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A113') {
												price =
													Math.ceil(
														(price /
															(100 -
																(v.product.streetNormalFee !== null
																	? v.product.streetNormalFee
																	: userInfo?.streetNormalFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 -
																(v.product.streetNormalFee !== null
																	? v.product.streetNormalFee
																	: userInfo?.streetNormalFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'B719') {
												price =
													Math.ceil(
														(price /
															(100 -
																(v.product.wemakepriceFee !== null
																	? v.product.wemakepriceFee
																	: userInfo?.wemakepriceFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 -
																(v.product.wemakepriceFee !== null
																	? v.product.wemakepriceFee
																	: userInfo?.wemakepriceFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A524') {
												price =
													Math.ceil(
														(price /
															(100 - (v.product.lotteonFee !== null ? v.product.lotteonFee : userInfo?.lotteonFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 - (v.product.lotteonFee !== null ? v.product.lotteonFee : userInfo?.lotteonFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'A525') {
												price =
													Math.ceil(
														(price /
															(100 -
																(v.product.lotteonNormalFee !== null
																	? v.product.lotteonNormalFee
																	: userInfo?.lotteonNormalFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount /
															(100 -
																(v.product.lotteonNormalFee !== null
																	? v.product.lotteonNormalFee
																	: userInfo?.lotteonNormalFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											} else if (vSiteCode === 'B956') {
												price =
													Math.ceil(
														(price / (100 - (v.product.tmonFee !== null ? v.product.tmonFee : userInfo?.tmonFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
												discount =
													Math.ceil(
														(discount / (100 - (v.product.tmonFee !== null ? v.product.tmonFee : userInfo?.tmonFee))) *
															(100 / calculateWonType),
													) * calculateWonType;
											}

											var originalPrice = price;

											if (discount === 0 && userInfo.discountAmount && userInfo.discountAmount > 0) {
												if (userInfo.discountUnitType === 'WON') {
													originalPrice = price + userInfo.discountAmount;
												} else {
													if (vSiteCode === 'A112' || vSiteCode === 'A027' || vSiteCode === 'A006') {
														originalPrice = Math.floor(price / (1 - userInfo.discountAmount / 100) / 10) * 10;
													} else {
														originalPrice = Math.ceil(price / (1 - userInfo.discountAmount / 100) / 10) * 10;
													}
												}
											}

											return {
												...imageInfo,
												id: v.product.id,
												wdate: '2020-11-26 19:43:09', //상품 등록일자
												edate: '2022-11-26 19:43:09', //상품 만료일자
												code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
												name: 'SellForYou',
												name2:
													vSiteCode === 'B378'
														? v.product.productStore.find((v2) => v2.siteCode === vSiteCode && v2.state === 2)
																?.etcVendorItemId ?? null
														: v.product.productStore.find((v2) => v2.siteCode === vSiteCode && v2.state === 2)
																?.storeProductId ?? null, //productStore의 id를 반환
												eng_name: '', //영어상품명
												china_name: '', //중국어상품명
												japan_name: '', //일본어상품명
												bonus: '', //사은품 명칭
												cate1, //표준 카테고리 대분류
												cate2, //표준 카테고리 중분류
												cate3, //표준 카테고리 소분류
												cate4, //표준 카테고리 세분류
												cate_code, //표준 카테고리 전체 코드
												cate_code2, //쇼핑몰별 카테고리 코드
												tax: '', //과세여부(과세,면세,영세)
												model: v.product.modelName, //모델명
												brand: v.product.brandName, //브랜드
												maker: v.product.manuFacturer, //제조사
												madein: '해외|아시아|중국', //원산지
												siil_data,
												nprice: discount, //시중가
												wprice1: originalPrice, //원가
												wprice2: 0, //공급가
												sprice: price, //판매가
												buy: 0, //구매수
												deliv: v.product.shippingFee > 0 ? '선결제' : '무료', //배송방법(무료,착불,선결제)
												deliv_fee: v.product.shippingFee, //배송비
												stock: 100, //재고
												misc1: v.product.taobaoProduct.videoUrl ?? '', //기타값1
												misc2: '', //기타값2
												misc3: '', //기타값3
												misc4: '', //기타값4
												misc5: '', //기타값5
												made_date: '0000-00-00', //제조일자
												expr_date: '0000-00-00', //유효일자
												opt_type: v.product.productOption.length === 0 ? '' : 'SELECT', //옵션타입
												use_addopt: false, //추가구매 옵션 적용여부
												model_id: '', //옥션, G마켓, 11번가, 인터파크, 스마트스토어 모델 고유코드
												use_siil_data: true, //품목정보 존재유무
												use_cert: 'A', //인증정보사용여부 A사용함, B:상세설명참조,C사용안함
												opt_type_select: v.product.productOption.length === 0 ? '' : 'SM', //선택형옵션의 상세 독립형:SS, 조합형:SM
												tmall_catalog_id: '', //11번가 카탈로그
												inpark_catalog_id: '', //인터파크 카탈로그
												tmall_catalog_etc: '', //11번가 카탈로그
												inpark_catalog_etc: '', //인터파크 카탈로그
												name_short: '', //요약상품명
												use_optImg: true, //옵션이미지 사용여부
												weight: 0, //상품무게
												//상세설명
												content:
													userInfo.optionAlignTop === 'N'
														? userInfo.useDetailInformation === 'N'
															? `<div style="text-align: center;">${
																	userInfo.fixImageTop
																		? '<img src="' +
																		  getValidUploadImageUrl(userInfo.fixImageTop, v.product.taobaoProduct.shopName) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }${
																	userInfo.fixImageSubTop
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageSubTop,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }<p>&nbsp;</p><p>&nbsp;</p>${
																	/product\/\d+\/description.html$/.test(v.product.description)
																		? (await getFromS3(v.product.description)).Body!.toString('utf8')
																		: v.product.description
															  }${await getOptionHeaderHtmlByProductId(
																	ctx.prisma,
																	v.product.id,
																	userInfo?.optionTwoWays,
																	userInfo?.optionIndexType,
																	v.product.taobaoProduct.shopName,
																	userInfo.useDetailInformation,
															  )}${
																	userInfo.fixImageBottom
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageBottom,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }${
																	userInfo.fixImageSubBottom
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageSubBottom,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }</div>`
															: `<div style="text-align: center;">${
																	userInfo.fixImageTop
																		? '<img src="' +
																		  getValidUploadImageUrl(userInfo.fixImageTop, v.product.taobaoProduct.shopName) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }${
																	userInfo.fixImageSubTop
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageSubTop,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }<p>&nbsp;</p><p>&nbsp;</p><p><div style="color: #000000; font-size: 24px; font-weight: bold; font-family: none;">상품 설명입니다.</div></p><p>&nbsp;</p><p>&nbsp;</p>${
																	/product\/\d+\/description.html$/.test(v.product.description)
																		? (await getFromS3(v.product.description)).Body!.toString('utf8')
																		: v.product.description
															  }${await getOptionHeaderHtmlByProductId(
																	ctx.prisma,
																	v.product.id,
																	userInfo?.optionTwoWays,
																	userInfo?.optionIndexType,
																	v.product.taobaoProduct.shopName,
																	userInfo.useDetailInformation,
															  )}${
																	userInfo.fixImageBottom
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageBottom,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }${
																	userInfo.fixImageSubBottom
																		? '<img src="' +
																		  getValidUploadImageUrl(
																				userInfo.fixImageSubBottom,
																				v.product.taobaoProduct.shopName,
																		  ) +
																		  '?' +
																		  Date.now() +
																		  '" alt="" />'
																		: ''
															  }</div>`
														: userInfo.useDetailInformation === 'N'
														? `<div style="text-align: center;">${
																userInfo.fixImageTop
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageTop, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${
																userInfo.fixImageSubTop
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageSubTop, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${await getOptionHeaderHtmlByProductId(
																ctx.prisma,
																v.product.id,
																userInfo?.optionTwoWays,
																userInfo?.optionIndexType,
																v.product.taobaoProduct.shopName,
																userInfo.useDetailInformation,
														  )}<p>&nbsp;</p><p>&nbsp;</p>${
																/product\/\d+\/description.html$/.test(v.product.description)
																	? (await getFromS3(v.product.description)).Body!.toString('utf8')
																	: v.product.description
														  }${
																userInfo.fixImageBottom
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageBottom, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${
																userInfo.fixImageSubBottom
																	? '<img src="' +
																	  getValidUploadImageUrl(
																			userInfo.fixImageSubBottom,
																			v.product.taobaoProduct.shopName,
																	  ) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }</div>`
														: `<div style="text-align: center;">${
																userInfo.fixImageTop
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageTop, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${
																userInfo.fixImageSubTop
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageSubTop, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${await getOptionHeaderHtmlByProductId(
																ctx.prisma,
																v.product.id,
																userInfo?.optionTwoWays,
																userInfo?.optionIndexType,
																v.product.taobaoProduct.shopName,
																userInfo.useDetailInformation,
														  )}<p>&nbsp;</p><p>&nbsp;</p><p><div style="color: #000000; font-size: 24px; font-weight: bold; font-family: none;">상품 설명입니다.</div></p><p>&nbsp;</p><p>&nbsp;</p>${
																/product\/\d+\/description.html$/.test(v.product.description)
																	? (await getFromS3(v.product.description)).Body!.toString('utf8')
																	: v.product.description
														  }${
																userInfo.fixImageBottom
																	? '<img src="' +
																	  getValidUploadImageUrl(userInfo.fixImageBottom, v.product.taobaoProduct.shopName) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }${
																userInfo.fixImageSubBottom
																	? '<img src="' +
																	  getValidUploadImageUrl(
																			userInfo.fixImageSubBottom,
																			v.product.taobaoProduct.shopName,
																	  ) +
																	  '?' +
																	  Date.now() +
																	  '" alt="" />'
																	: ''
														  }</div>`,

												content1:
													userInfo.optionAlignTop === 'N'
														? userInfo.useDetailInformation === 'N'
															? `<div style="text-align: center;"><p>&nbsp;</p><p>&nbsp;</p>${
																	/product\/\d+\/description.html$/.test(v.product.description)
																		? (await getFromS3(v.product.description)).Body!.toString('utf8')
																		: v.product.description
															  }${await getOptionHeaderHtmlByProductId(
																	ctx.prisma,
																	v.product.id,
																	userInfo?.optionTwoWays,
																	userInfo?.optionIndexType,
																	v.product.taobaoProduct.shopName,
																	userInfo.useDetailInformation,
															  )}</div>`
															: `<div style="text-align: center;"><p>&nbsp;</p><p>&nbsp;</p><p><div style="color: #000000; font-size: 24px; font-weight: bold; font-family: none;">상품 설명입니다.</div></p><p>&nbsp;</p><p>&nbsp;</p>${
																	/product\/\d+\/description.html$/.test(v.product.description)
																		? (await getFromS3(v.product.description)).Body!.toString('utf8')
																		: v.product.description
															  }${await getOptionHeaderHtmlByProductId(
																	ctx.prisma,
																	v.product.id,
																	userInfo?.optionTwoWays,
																	userInfo?.optionIndexType,
																	v.product.taobaoProduct.shopName,
																	userInfo.useDetailInformation,
															  )}</div>`
														: userInfo.useDetailInformation === 'N'
														? `<div style="text-align: center;">${await getOptionHeaderHtmlByProductId(
																ctx.prisma,
																v.product.id,
																userInfo?.optionTwoWays,
																userInfo?.optionIndexType,
																v.product.taobaoProduct.shopName,
																userInfo.useDetailInformation,
														  )}<p>&nbsp;</p><p>&nbsp;</p>${
																/product\/\d+\/description.html$/.test(v.product.description)
																	? (await getFromS3(v.product.description)).Body!.toString('utf8')
																	: v.product.description
														  }</div>`
														: `<div style="text-align: center;">${await getOptionHeaderHtmlByProductId(
																ctx.prisma,
																v.product.id,
																userInfo?.optionTwoWays,
																userInfo?.optionIndexType,
																v.product.taobaoProduct.shopName,
																userInfo.useDetailInformation,
														  )}<p>&nbsp;</p><p>&nbsp;</p><p><div style="color: #000000; font-size: 24px; font-weight: bold; font-family: none;">상품 설명입니다.</div></p><p>&nbsp;</p><p>&nbsp;</p>${
																/product\/\d+\/description.html$/.test(v.product.description)
																	? (await getFromS3(v.product.description)).Body!.toString('utf8')
																	: v.product.description
														  }</div>`,

												content2: `<div style="text-align: center;">${
													userInfo.fixImageTop
														? '<img src="' +
														  getValidUploadImageUrl(userInfo.fixImageTop, v.product.taobaoProduct.shopName) +
														  '?' +
														  Date.now() +
														  '" alt="" />'
														: ''
												}${
													userInfo.fixImageSubTop
														? '<img src="' +
														  getValidUploadImageUrl(userInfo.fixImageSubTop, v.product.taobaoProduct.shopName) +
														  '?' +
														  Date.now() +
														  '" alt="" />'
														: ''
												}</div>`, //추가상세설명
												content3: `<div style="text-align: center;">${
													userInfo.fixImageBottom
														? '<img src="' +
														  getValidUploadImageUrl(userInfo.fixImageBottom, v.product.taobaoProduct.shopName) +
														  '?' +
														  Date.now() +
														  '" alt="" />'
														: ''
												}${
													userInfo.fixImageSubBottom
														? '<img src="' +
														  getValidUploadImageUrl(userInfo.fixImageSubBottom, v.product.taobaoProduct.shopName) +
														  '?' +
														  Date.now() +
														  '" alt="" />'
														: ''
												}</div>`,
												///content3:product\/\d+\/description.html$/.test(v.product.description) ? (await getFromS3(v.product.description)).Body!.toString("utf8") : v.product.description, //광고/홍보
												eng_content: '', //영어 상세설명
												china_content: '', //중국어 상세설명
												japan_content: '', //일본어 상세설명
												catalog_etc: '', //카탈로그 정보(오픈마켓전용)
												addon_opt: null, //추가구매옵션
												cert: v.product.productStore.every((v2) => v2.siteCode != vSiteCode || v2.state != 2), //every는 조건에만족하는 것을 반환
												model_etc: '', //샵N 모델명
												eng_keyword: '', //영어 키워드
												china_keyword: '', //중국어 키워드
												japan_keyword: '', //일본어 키워드
												made_country: '', //생산지 국가
												hs_code: '', //전세계배송코드
												imgtag: '', //이미지태그
												site_code: vSiteCode, //쇼핑몰 코드
												site_id: '', //쇼핑몰 아이디
												site_sprice: price, //쇼핑몰 판매가
												site_stock: v.product.productOption.reduce((p, c) => p + (c.stock ?? 0), 1), //쇼핑몰 재고
												site_buy: 0, //쇼핑몰 판매수량
												slave_state: '판매대기', //쇼핑몰별 툴 상품상태('판매대기','판매중','수정대기','취소대기','판매취소','판매종료','판매제외','종료대기','일시품절','재고품절대기','승인대기')
												slave_state_old: '판매대기', //쇼핑몰별 툴 변경 이전 상품상태('판매대기','판매중','수정대기','취소대기','판매취소','판매종료','판매제외','종료대기','일시품절','재고품절대기','승인대기')
												slave_state_date: '', //쇼핑몰별 툴 상품상태 변경일
												slave_wdate: '', //쇼핑몰별 툴 상품등록일
												slave_reg_edate: '0001-01-01 00:00:00', //쇼핑몰별 상품 판매 종료일
												slave_reg_code: '',
												//slave_reg_code: `${prodSlaveCode}`, //쇼핑몰별 사이트 상품코드
												slave_type: '', //쇼핑몰별 판매방식
												// name3: `${replaceWordTable(v.product.name, wordTable)}`, //상품명
												name3: v.product.name, //상품명
												deliv2: v.product.shippingFee > 0 ? '선결제' : '무료', //쇼핑몰별 배송방법('무료','착불','선결제','착불/선결제')
												deliv_fee2: v.product.shippingFee, //쇼핑몰별 배송비
												cate_manual: '',
												slave_set_data: '',
												slave_reg_code_sub: '',
												optImg_URL: null, //옵션이미지(url)
												result: null, //등록 결과 수신용
												result_error: null, //등록 결과 수신용
												result_error_code: null, //등록 결과 수신용
												keyword1: v.product.searchTags ?? '',
												keyword2: v.product.immSearchTags ?? '',
												keyword3: '',
												keyword4: '',
												keyword5: '',
											};
										}),
									),
									//todo 아래항목 제거 type  맞추기
									// config: [
									//     {
									//         ProdUseDenyKeyword: "", //등록 금지 키워드 사용 여부
									//         ProdUseDenyKeywordString: "", //등록 금지 키워드 내용 (,로 구분)
									//         ProdUseCancelMsg: "", //판매취소 사유 메세지 사용 여부
									//         ProdUseCancelMsgString: "", //판매취소 사유 메세지 사용시 메세지 여부
									//         ProdSearchDate: "", //상품수집 검색 기간 (년)
									//         ProdUseEditImg: "", //수정 후 등록시 이미지도 다시 등록하기 여부
									//         OrderSearchDate: "", //주문 및 문의 수집 기간
									//     },
									// ],
								},
								DataDataSetFileName: '',
								syncList: '',
								fromState: '',
								SetNo: '',
								Desc: '',
							},
						};
						job_json_array.push(job_json);
					}),
				);

				// return JSON.stringify({ job_data: job_json});
				return JSON.stringify({ job_json_array });
			} catch (e) {
				throw e as Error;
			}
		} catch (e) {
			return throwError(e, ctx);
		}
	};

export const query_product_store = extendType({
	type: 'Query',
	definition(t) {
		t.field('getRegisterProductsDataByUser', {
			type: nonNull('String'),
			args: {
				productIds: nonNull(list(nonNull(intArg()))),
				siteCode: nonNull(list(nonNull(stringArg()))),
			},
			resolve: registerProductResolver(null),
		});
	},
});
