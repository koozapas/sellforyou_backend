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
            let ip : any= req.headers['x-real-ip'] || req.connection.remoteAddress;
         
            let productStoreId = await prisma.productStore.findMany({
                where : { siteCode , productId : parseInt(productId)} ,
            }) 

            if(productStoreId.length === 0) return throwError(errors.etc("Not productStore Id"),null);

            let productViewLog = await prisma.productViewLog.findMany({
                where : { clientIp : ip , siteCode , productStoreId : productStoreId[0].id} 
            })

            if(productViewLog.length ===0){
                
                let productStore = await prisma.productStore.updateMany({
                    where : { siteCode : siteCode , productId : parseInt(productId)},
                    data : { cnt : { increment : 1} }
                })
                
                if(!productStore) return throwError(errors.etc("조회 업데이트 실패"),null);
                
                await prisma.productViewLog.create({
                    data : {
                        clientIp : ip,
                        productStoreId : productStoreId[0].id,
                        siteCode 
                    }
                })

            }else{
                const nowdate = new Date();
                let lastViewTime :any = productViewLog[0].viewTime ;
                const diffMSec = nowdate.getTime() - lastViewTime.getTime();
                const diffMin = diffMSec / (60 * 1000);

                if(diffMin > 1440){

                    let productStore = await prisma.productStore.updateMany({
                        where : { siteCode : siteCode , productId : parseInt(productId)},
                        data : { cnt : { increment : 1} }
                    })
                    
                    if(!productStore) return throwError(errors.etc("조회 업데이트 실패"),null);

                    await prisma.productViewLog.update({
                        where : {id : productViewLog[0].id },data : { viewTime : new Date()}
                    })
                    
                }
            }

            res.sendFile(join(__dirname,"tiny_white.png"))
        }
        catch (e) {
                console.log(e);
                res.sendStatus(500)

        }
            finally {
                prisma.$disconnect();
        }
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
    }
}