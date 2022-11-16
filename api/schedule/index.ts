import schedule from 'node-schedule';
import { PrismaClient } from '@prisma/client';
import { getPurchaseInfo } from "../../api/graphql/user";
import fetch from "node-fetch";
import * as CryptoJS from "crypto-js";
function betweenDay(firstDate : any, secondDate:any)
{
     
    var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
    var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
    var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
    return Math.floor(betweenTime / (1000 * 60 * 60 * 24));
}

type IheadersData ={
    "Content-Type" : string;
    "x-ncp-apigw-timestamp" : string ;
    "x-ncp-iam-access-key" : string ;
    "x-ncp-apigw-signature-v2" : string ;
}

export const runScheduler = () => {
    schedule.scheduleJob("0 0 9 * * *", async () => {
        try {
            const prisma = new PrismaClient();
            let today = new Date();
            const userInfo = await prisma.userInfo.findMany({select : { userId : true , phone : true}});

            let threeDaysAgo :any= [];
            let onedayAgo :any= [];

            await Promise.all(userInfo.map(async(v:any)=> {
                const purchaseInfo = await getPurchaseInfo(prisma,v.userId);

                if(purchaseInfo.level >= 2){
                    if(betweenDay(today.toISOString().substring(0,10).replace(/-/g,''),purchaseInfo.levelExpiredAt.toISOString().substring(0,10).replace(/-/g,'')) === 3 ){
                        threeDaysAgo.push(v.phone);
                    }
                    if(betweenDay(today.toISOString().substring(0,10).replace(/-/g,''),purchaseInfo.levelExpiredAt.toISOString().substring(0,10).replace(/-/g,'')) === 1 ){
                        onedayAgo.push(v.phone);
                    }
                }
            }))

            threeDaysAgo.map(async(v:any) => {
            let verfifyData = {
                "type":"SMS",
                "contentType":"COMM",
                "countryCode":"82",
                "from":"07040647890",
                "subject":"",
                "content":`[셀포유] 셀포유 이용기간 만료 3일전 입니다.`,
                "messages":[
                    {
                        "to": v,
                    }
                ],
            };

            const now = new Date().getTime();
                    const path = `/sms/v2/services/ncp:sms:kr:259001473572:verification/messages`;
                    const accesskey = "xzd0g9r6eCQ8uS8033tu";
                    const secretkey = "Hb3DJDmA0WaxXqE8qUWm4a6dSf2vliE7dizN3nq1";
                    const base_str = `POST ${path}\n${now}\n${accesskey}`;
                    const signature = CryptoJS.HmacSHA256(base_str, secretkey).toString(CryptoJS.enc.Base64);
                    
                    let headersData : IheadersData = {
                        "Content-Type" : "application/json; charset=utf-8",
        
                        "x-ncp-apigw-timestamp" : now.toString(),
                        "x-ncp-iam-access-key" : accesskey,
                        "x-ncp-apigw-signature-v2" : signature
                    }

                    await fetch(`https://sens.apigw.ntruss.com${path}`, {
                        headers: headersData,
                        method: "POST",
                        body: JSON.stringify(verfifyData)
                    });
            })

            
            onedayAgo.map(async(v:any) => {
                let verfifyData = {
                    "type":"SMS",
                    "contentType":"COMM",
                    "countryCode":"82",
                    "from":"07040647890",
                    "subject":"",
                    "content":`[셀포유] 셀포유 이용기간 만료 1일전 입니다.`,
                    "messages":[
                        {
                            "to": v,
                        }
                    ],
                };
    
                const now = new Date().getTime();
                        const path = `/sms/v2/services/ncp:sms:kr:259001473572:verification/messages`;
                        const accesskey = "xzd0g9r6eCQ8uS8033tu";
                        const secretkey = "Hb3DJDmA0WaxXqE8qUWm4a6dSf2vliE7dizN3nq1";
                        const base_str = `POST ${path}\n${now}\n${accesskey}`;
                        const signature = CryptoJS.HmacSHA256(base_str, secretkey).toString(CryptoJS.enc.Base64);
                        
                        let headersData : IheadersData = {
                            "Content-Type" : "application/json; charset=utf-8",
            
                            "x-ncp-apigw-timestamp" : now.toString(),
                            "x-ncp-iam-access-key" : accesskey,
                            "x-ncp-apigw-signature-v2" : signature
                        }
    
                        await fetch(`https://sens.apigw.ntruss.com${path}`, {
                            headers: headersData,
                            method: "POST",
                            body: JSON.stringify(verfifyData)
                        });
                })
    



        }
        catch (e) {
            console.log("결제 스케줄러 처리에서 에러 발생:", e);
        }
    });
    console.log("Scheduler Initialized")
}
