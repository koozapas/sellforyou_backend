//add_job.ts  
import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import { IPAJobCallbackDoneResponse, IPAJobCallbackResponse, IPAJobCallbackRegistProdResultJson, IPAJobCallbackFailedResultJson, shopDataUrlInfo } from "../playauto_api_type";
import { Prisma, PrismaClient } from "@prisma/client";
import { ProductStoreStateEnum } from "../graphql";
import { publishUserLogData } from "../utils/local/pubsub";
import { pubsub } from "../utils/helpers";
import { errors, throwError } from "../utils/error";

function isDoneResponse(response: IPAJobCallbackResponse<IPAJobCallbackRegistProdResultJson>): response is IPAJobCallbackDoneResponse<IPAJobCallbackRegistProdResultJson> {
    return (<IPAJobCallbackDoneResponse<IPAJobCallbackRegistProdResultJson>>response).results !== undefined;
}

function isFailedResponse(response: IPAJobCallbackRegistProdResultJson[] | IPAJobCallbackFailedResultJson): response is IPAJobCallbackFailedResultJson {
    return (<IPAJobCallbackFailedResultJson>response).Result !== undefined;
}
// const numberToState: { [key: number]: productStoreLogEnum } = {
//     // 0: 'WAIT',
//     // 1: "SUCCESS",
//     // 2: "FAIL",
//     // 3: "CANCEL",
//     // 4: "ON_PROGRESS"
// }

export const addJobCallbackHandler = async (req: Request, res: Response) => {
    try {
        const response: IPAJobCallbackResponse<IPAJobCallbackRegistProdResultJson> = req.body;
        if (!response.job_id) {
            res.sendStatus(400);
            return;
        }
        if (isDoneResponse(response)) {


            const result = response.results["result.json"];
            const config = response.results["config.json"];
            if (isFailedResponse(result)) {
                console.log("addJobCallbackHandler : Internal Server Error", response)
                res.sendStatus(400);
                return;
            }
            result.map((v, i, a) => a[i].setdata = '_생략_')
            const prisma = new PrismaClient();
            try {
                const results = await Promise.all(result.map(async v => {
                    if (v.state !== 1) {
                        //todoconsole.log("오류 발생", { result: v, config, jobId: response.job_id });
                    }
                    const name = v.code.split('_');
                    const productId = parseInt(name[1], 36);
                    const product = await prisma.product.findUnique({
                        where: { id: productId },
                        include: {
                            productStore: {
                                orderBy: [{ id: "desc" }],
                            },
                            user: { select: { userInfo: { select: { naverStoreUrl: true } } } }
                        }
                    });
                    if (!product) {
                        console.log("addJob 정보 없음 : ", v);
                        return;
                    }
                    const productStore = product.productStore.find(v2 => v2.siteCode === v.site_code);
                    if (!productStore) {
                        if (response.job_id === 'KOOZA') { //확장프로그램
                            if (v.state !== 1 && v.state !== 2) {
                                console.log("addJob 콜백 : state가 1,2가 아님");
                                return;
                            }
                            const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : { connect: { id: ProductStoreStateEnum.REGISTER_FAILED } };
                            const etcVendorItemId = v.site_code === 'B378' ? v.slave_reg_code_sub : undefined;
                            const updatedResult = await prisma.productStore.create({
                                data: {
                                    storeProductId: v.slave_reg_code !== '' ? v.slave_reg_code : undefined,
                                    productStoreState:productStoreState,
                                    productStoreLog: v.state === 2 ? {
                                        create: {
                                            jobId: response.job_id,
                                            destState: ProductStoreStateEnum.ON_SELL,
                                            uploadState: v.state,
                                            errorMessage: v.msg,
                                        }
                                    } : undefined,
                                    product: { connect: { id: product.id } },
                                    etcVendorItemId : etcVendorItemId,
                                    storeUrl:  v.slave_reg_code !== '' ? shopDataUrlInfo[v.site_code]({ id: v.slave_reg_code, storeFullPath: product.user?.userInfo?.naverStoreUrl, vendorId: etcVendorItemId }) : undefined,
                                    siteCode: v.site_code,
                                    user: { connect: { id: product.userId! } },
                                }
                            })
                            await prisma.product.update({
                                where: { id: updatedResult.productId }, data: {
                                    //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                                    state : v.state === 1 ? 7 : undefined,
                                    stockUpdatedAt : v.state ===1? new Date() : undefined ,
                                }
                            })
                            return { userId: product.userId, productId: product.id, reason: v.msg, state: v.state };
                        }
                        else {
                            console.log("addJob 정보 없음(인덱스 찾기 실패) : ", JSON.stringify({ result, product: require('util').inspect(product, undefined, 8) }));
                        }
                        return;
                    }
                    else {
                        const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } }  : undefined;
                        const etcVendorItemId = v.site_code === 'B378' ? v.slave_reg_code_sub : undefined;
                        const updatedResult = await prisma.productStore.update({
                            where: { id: productStore.id },
                            data: {
                                storeProductId: v.slave_reg_code !== '' ? v.slave_reg_code : undefined,
                                productStoreState : productStoreState,
                                productStoreLog: v.state === 2 ? {
                                    create: {
                                        jobId: response.job_id,
                                        destState: ProductStoreStateEnum.ON_SELL,
                                        uploadState: v.state,
                                        errorMessage: v.msg,
                                    }
                                } : {
                                    deleteMany : {
                                       productStoreId : productStore.id
                                    }
                                } ,
                                product: { connect: { id: product.id } },
                                etcVendorItemId : etcVendorItemId,
                                storeUrl: v.slave_reg_code !== '' ? shopDataUrlInfo[v.site_code]({ id: v.slave_reg_code, storeFullPath: product.user?.userInfo?.naverStoreUrl, vendorId: etcVendorItemId }) : undefined,
                                siteCode: v.site_code,
                                user: { connect: { id: product.userId! } },
                            }
                        })
                        await prisma.product.update({
                            where: { id: updatedResult.productId }, data: {
                                 //state: v.state === 1 ? 7 : v.state === 2 ? 9 : undefined,
                                 state : v.state === 1 ? 7 : undefined,
                                 stockUpdatedAt : v.state ===1 ? new Date() : undefined ,
                            }
                        })
                    }
                    return { userId: product.userId, productId: product.id, reason: v.msg, state: v.state };
                }))
                const userId = results.find(v => v?.userId)?.userId;
                if (userId) {
                    const successfulMessage = results.filter(v => v && v?.state === 1).map(v => `등록되었습니다. (SFY_${v!.productId.toString(36)})`).join('\n')
                    const failedMessage = results.filter(v => v && v?.state !== 1).map(v => `등록되지 않았습니다. (SFY_${v!.productId.toString(36)}) 실패 사유: ${v!.reason}`).join('\n')
                    
                    await publishUserLogData({ prisma, pubsub, token: { userId } }, { type: "registerProduct", title: `상품이 오픈마켓에 \n${successfulMessage}\n${failedMessage}` });
                }
            }
            catch (e) {
                console.log('addJob Update Error');
                console.log(e);
                console.log({ result, config, jobId: response.job_id });
                res.sendStatus(500)
                return throwError(errors.etc("connection error"),null);

            }
            finally {
                prisma.$disconnect();
            }
        }
        else {
        }
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
        return throwError(errors.etc("connection error"),null);
    }
}