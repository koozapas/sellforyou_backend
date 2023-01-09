//add_job.ts  
import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import { IPAJobCallbackDoneResponse, IPAJobCallbackResponse, IPAJobCallbackRegistProdResultJson, IPAJobCallbackFailedResultJson, shopDataUrlInfo } from "../playauto_api_type";
import { PrismaClient } from "@prisma/client";
import { ProductStoreStateEnum } from "../graphql";
import { publishUserLogData } from "../utils/local/pubsub";
import { pubsub } from "../utils/helpers";
import { errors, throwError } from "../utils/error";
import { closestIndexTo } from "date-fns";

export const dataProvider = async (req: Request, res: Response) => {
    try {
        let productId :any = req.query.productId;
        let siteCode : any= req.query.siteCode;
        const prisma = new PrismaClient();
        try{
            let productStore = await prisma.productStore.updateMany({
                where : { siteCode , productId},
                data : { cnt:{increment : 1}}
            })
            if(!productStore) throwError(errors.etc("조회 업데이트 실패"),null);
            // return res.json({
            //     isSuccess : true,
            //     code : 200,
            //     queryTest : {
            //         productId : productId,
            //         siteCode :siteCode
            //     }
            // });
            res.sendFile(join(__dirname,"tiny_white.png"))
        }
        catch (e) {
                console.log('검색 Update Error');
                // console.log(e);
                // console.log({ result, config, jobId: response.job_id });
                res.sendStatus(500)
                return throwError(errors.etc("connection error"),null);

        }
            finally {
                prisma.$disconnect();
        }
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
        return throwError(errors.etc("connection error"),null);
    }
}