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
         
            let productStoreId = await prisma.productStore.findFirst({
                where : { siteCode , productId : parseInt(productId)} ,
            }) 

            if(!productStoreId) return throwError(errors.etc("Not productStore Id"),null);

            let productViewLog = await prisma.productViewLog.findMany({
                where : { clientIp : ip , siteCode , productStoreId : productStoreId.id} 
            })
            if(productViewLog.length ===0){
                
                await prisma.productStore.update({where:{id:productStoreId.id},data:{cnt:{increment: 1}}})

                await prisma.productViewLog.create({
                    data : {
                        clientIp : ip,
                        userId : productStoreId.userId,
                        productStoreId : productStoreId.id,
                        productId : productStoreId.productId,
                        siteCode 
                    }
                })

            }else{
                const nowdate = new Date();
                // let lastViewTime :any = productViewLog[0].viewTime ;
                let lastView : any = productViewLog.reduce((prev : any,curr:any) => { return new Date(prev).getTime() <= new Date(curr).getTime() ? prev : curr ;});
                let lastViewTime : any = lastView.viewTime;
                const diffMSec = nowdate.getTime() - lastViewTime.getTime();
                const diffMin = diffMSec / (60 * 1000);

                if(diffMin > 30){
                    await prisma.productViewLog.create({
                        data : {
                            clientIp : ip,
                            userId :  productStoreId.userId,
                            productStoreId : productStoreId.id,
                            productId : productStoreId.productId,
                            siteCode 
                        }
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