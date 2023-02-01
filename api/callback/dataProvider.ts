//add_job.ts  
import { Request, Response } from "express"
import { join } from 'path'
import { PrismaClient } from "@prisma/client";
import { errors, throwError } from "../utils/error";

export const dataProvider = async (req: Request, res: Response) => {
    try {
        // let productId :any = req.query.productId;
        // let siteCode : any= req.query.siteCode;
        const prisma = new PrismaClient();
        try{
            let ip : any= req.headers['x-real-ip'] || req.connection.remoteAddress;
         
            // let productStoreId = await prisma.productStore.findMany({
            //     where : { siteCode , productId : parseInt(productId)} 
            // }) 

            // if(!productStoreId) return throwError(errors.etc("Not productStore Id"),null);

            // let productViewLog = await prisma.productViewLog.findMany({
            //     where : { clientIp : ip , siteCode , productStoreId : productStoreId[0].id} 
            // })

            // if(!productViewLog){
            //     let productStore = await prisma.productStore.updateMany({
            //         where : { siteCode : siteCode , productId : parseInt(productId)},
            //         data : { cnt : { increment : 1} }
            //     })

            //     if(!productStore) throwError(errors.etc("조회 업데이트 실패"),null);
                
            //     await prisma.productViewLog.create({
            //         data : {
            //             clientIp : ip,
            //             productStoreId : productStoreId[0].id,
            //             siteCode 
            //         }
            //     })

            // }else{
            //     const nowdate = new Date();
            //     let lastViewTime :any = productViewLog[0].viewTime ;
            //     const diffMSec = nowdate.getTime() - lastViewTime.getTime();
            //     const diffMin = diffMSec / (60 * 1000);

            //     if(diffMin > 1440){

            //         let productStore = await prisma.productStore.updateMany({
            //             where : { siteCode : siteCode , productId : parseInt(productId)},
            //             data : { cnt : { increment : 1} }
            //         })
            //         if(!productStore) throwError(errors.etc("조회 업데이트 실패"),null);

            //         await prisma.productViewLog.update({
            //             where : {id : productViewLog[0].id },data : { viewTime : new Date()}
            //         })
                    
            //     }
            // }

          
            
            console.log(ip); //잘받아오는거 확인함 

            //  2번째  
            // if(typeof window !== "undefined") {
            //     console.log(window.tempProperty);

            // } backend에서 window의 위치를 특정할수 없어서 window 객체는 front에서만 사용 가능하다고 나오긴하네 .. 흠  


            // 3번째 pc에서 api 호추했는지 모바일에서 호출했는지 아는방법 찾기 .
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