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

export const dataProvider = async (req: Request, res: Response) => {
    try {
        
        let productId = req.query.productId;
        let siteCode = req.query.siteCode;

        console.log("productId",productId);
        console.log("siteCode",siteCode);

        res.sendStatus(200);
        return "img파일";
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
        return throwError(errors.etc("connection error"),null);
    }
}