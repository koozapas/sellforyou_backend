import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { errors, throwError } from '../utils/error';
import { generateToken, generateUserToken, encrypt, decrypt } from '../utils/helpers';
import { APP_REFRESH_SECRET, regexPattern } from '../utils/constants';
import { verify } from 'jsonwebtoken';
import { Token } from '../types';
import { differenceInMinutes } from 'date-fns';
import { getRandomVerificationNumber } from '../utils/local/phone_verification';
import fetch from 'node-fetch';
import * as CryptoJS from 'crypto-js';

export const t_PhoneVerification = objectType({
	name: 'PhoneVerification',
	definition(t) {
		t.model.id();
		t.model.tel();
		t.model.verificationNumber();
		t.model.createdAt();
		t.model.used();
	},
});
type IheadersData = {
	'Content-Type': string;
	'x-ncp-apigw-timestamp': string;
	'x-ncp-iam-access-key': string;
	'x-ncp-apigw-signature-v2': string;
};
export const mutation_auto = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('silentRefreshToken', {
			// 수성완료 silent refresh
			type: 'SignInType', //SignIntype은 return값이 accesstoken , refresh token string임

			args: {
				refreshToken: nonNull(stringArg()),
			},

			resolve: async (src, args, ctx, info) => {
				let accessToken = '';
				let now = new Date();
				let day = 0;
				let refreshToken = '';

				try {
					const refreshTokenInfo = verify(args.refreshToken, APP_REFRESH_SECRET, { algorithms: ['HS512'] }) as Token; // 이건 이제 id가아니라 어떤 Token인지
					let decryptId = decrypt(refreshTokenInfo.userId);
					if (refreshTokenInfo.type == 'userId') {
						console.log('복호화된 id', decryptId);
						if (!decryptId) {
							return throwError(errors.etc('E01'), ctx);
						}

						const userInfo = await ctx.prisma.user.findUnique({ where: { id: parseInt(decryptId) } });

						if (!userInfo) {
							return throwError(errors.etc('E02'), ctx);
						}

						// const purchaseInfo = await getPurchaseInfo(ctx.prisma, refreshTokenInfo.userId);

						// 2단계 동시접속 유예중, 3단계부터 동시접속 허용
						// if (purchaseInfo.level < 2) {
						//     if (!userInfo.token || !userInfo.createdToken) {
						//         return throwError(errors.etc("E03"), ctx);
						//     }

						//     if (userInfo.token !== args.refreshToken) {
						//         return throwError(errors.etc("E04"), ctx);
						//     }

						//     day = ((now.getTime() - userInfo.createdToken.getTime()) / (1000 * 3600 * 24)) ;

						//     if (day >= 1) return throwError(errors.etc("E05"), ctx);
						// }

						accessToken = await generateUserToken(ctx.prisma, userInfo.id);
						let encryptId = encrypt(userInfo.id.toString());
						console.log('refresh encryptId', encryptId);
						refreshToken = generateToken(encryptId, 'userId', true);

						const Token = await ctx.prisma.user.update({
							where: {
								id: userInfo.id,
							},
							data: {
								token: refreshToken,
							},
						});

						if (!Token) {
							return throwError(errors.etc('E06'), ctx);
						}
					} else if (refreshTokenInfo.type == 'adminId') {
						const adminInfo = await ctx.prisma.admin.findUnique({
							where: {
								token: args.refreshToken,
							},
						});

						if (!adminInfo || adminInfo.createdToken === null) {
							return throwError(errors.etc('해당 token을 가진 사용자가 존재하지 않습니다.'), ctx);
						} else {
							day = (now.getTime() - adminInfo.createdToken.getTime()) / (1000 * 3600 * 24);

							if (day >= 1) return throwError(errors.etc('토큰을 재발급 할수 없습니다.'), ctx); //refresh Token 처음 생성일 기준으로 기한인 하루지나면 accessToken을 재발급해주지않음

							accessToken = generateToken(adminInfo.id, 'adminId', false);

							refreshToken = generateToken(adminInfo.id, 'adminId', true); //refreshToken도 재발급 왜냐면 이걸 호출하면서 노출이되서 보안상 해킹당했을수도잇으므로

							const Token = await ctx.prisma.admin.update({
								where: {
									id: adminInfo.id,
								},
								data: {
									token: refreshToken,
								},
							});

							if (!Token) return throwError(errors.etc('토큰을 재발급 하였으나, 저장에 실패하였습니다. '), ctx);
						}
					}

					//todoconsole.log("REFRESH 200 OK:", refreshToken);

					return { accessToken, refreshToken };
				} catch (e) {
					console.log('REFRESH 500 ERROR:', refreshToken);
					console.log('REFRESH ARGS:', args);
					console.log(e);

					return throwError(errors.etc('E00'), ctx);
				}
			},
		});
		t.field('requestPhoneVerificationByEveryone', {
			type: nonNull('Boolean'),
			args: {
				phoneNumber: nonNull(stringArg()),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					if (!regexPattern.phone.test(args.phoneNumber))
						return throwError(errors.etc('휴대폰 번호 형식이 잘못되었습니다.'), ctx);
					const tel = args.phoneNumber.replace(regexPattern.phone, '0$1$2$3');
					const verification = await ctx.prisma.phoneVerification.findFirst({
						where: {
							tel,
							used: 0,
						},
						orderBy: { createdAt: 'desc' },
					});
					if (verification && tel !== '01027060464') return throwError(errors.etc('이미 인증된 번호입니다.'), ctx);
					//관리자테스트용 번호는 계속 인증번호 발송되도록 해둠

					const verificationNumber = getRandomVerificationNumber(); //숫자를만들어냄
					console.log(`인증 번호 발송) ${tel} : ${verificationNumber}`);

					let verfifyData = {
						type: 'SMS',
						contentType: 'COMM',
						countryCode: '82',
						from: '07040647890',
						subject: '',
						content: `[셀포유] 인증번호 [${verificationNumber}]를 입력해주세요.`,
						messages: [
							{
								to: tel,
							},
						],
					};

					const now = new Date().getTime();
					const path = `/sms/v2/services/ncp:sms:kr:259001473572:verification/messages`;
					const accesskey = 'xzd0g9r6eCQ8uS8033tu';
					const secretkey = 'Hb3DJDmA0WaxXqE8qUWm4a6dSf2vliE7dizN3nq1';
					const base_str = `POST ${path}\n${now}\n${accesskey}`;
					const signature = CryptoJS.HmacSHA256(base_str, secretkey).toString(CryptoJS.enc.Base64);

					let headersData: IheadersData = {
						'Content-Type': 'application/json; charset=utf-8',

						'x-ncp-apigw-timestamp': now.toString(),
						'x-ncp-iam-access-key': accesskey,
						'x-ncp-apigw-signature-v2': signature,
					};

					await fetch(`https://sens.apigw.ntruss.com${path}`, {
						headers: headersData,
						method: 'POST',
						body: JSON.stringify(verfifyData),
					});

					await ctx.prisma.phoneVerification.create({ data: { tel, verificationNumber } });

					// return throwError(errors.etc(`인증 번호 발송) ${tel} : ${verification_number }`),null);
					return true;
				} catch (error) {
					return throwError(error, ctx);
				}
			},
		});

		t.field('verifyPhoneByEveryone', {
			type: nonNull('String'),
			args: {
				phoneNumber: nonNull(stringArg()),
				verificationNumber: nonNull(stringArg()),
			},
			resolve: async (src, args, ctx, info) => {
				try {
					console.log(args.phoneNumber);
					console.log(args.verificationNumber);
					if (!regexPattern.phone.test(args.phoneNumber))
						return throwError(errors.etc('휴대폰 번호 형식이 잘못되었습니다.'), ctx);
					const tel = args.phoneNumber.replace(regexPattern.phone, '0$1$2$3');

					const verification = await ctx.prisma.phoneVerification.findFirst({
						where: { tel, verificationNumber: args.verificationNumber },
					});

					if (!verification) return throwError(errors.etc('인증 번호가 일치하지 않습니다.'), ctx);

					if (differenceInMinutes(new Date(), verification.createdAt) > 1)
						return throwError(errors.etc('인증시간이 경과되었습니다.'), ctx);

					// if (differenceInMinutes(new Date(), verification.createdAt) > 1) {
					//     await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });

					//     return throwError(errors.etc("인증 정보가 만료되었습니다. 다시 시도해주세요."), ctx);
					// }
					// const updatesuccess = await ctx.prisma.phoneVerification.updateMany({
					//     where : {
					//         tel : verification.tel ,
					//         verificationNumber : verification.verificationNumber
					//     },
					//     data : {
					//         used : 0
					//     }
					// })
					// if(!updatesuccess) return throwError(errors.etc("인증 실패 하였습니다."), ctx);
					return `인증 성공 하였습니다.`;
				} catch (error) {
					return throwError(error, ctx);
				}
			},
		});
	},
});
