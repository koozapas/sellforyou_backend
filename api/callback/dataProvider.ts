//add_job.ts  
import { Request, Response } from "express"
import { join } from 'path'
import { PrismaClient } from "@prisma/client";
import { errors, throwError } from "../utils/error";

export const dataProvider = async (req: Request, res: Response) => {
    try {
        let productId :any = req.query.productId;
        let siteCode : any= req.query.siteCode;
        const prisma = new PrismaClient();
        try{
            let productStore = await prisma.productStore.updateMany({
                where : { siteCode : siteCode , productId : parseInt(productId)},
                data : { cnt : { increment : 1}}
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
                console.log(e);
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