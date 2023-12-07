// import { config } from "dotenv";
// config();
// // import { RedisPubSub } from 'graphql-redis-subscriptions';
// // import Redis, { RedisOptions } from 'ioredis';
// import schedule from "node-schedule";

// const dayOfWeekNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// // const prisma = new PrismaClient();
// // const redisOption: RedisOptions = {
// //     host: process.env.REDIS_HOST!,
// //     port: +process.env.REDIS_PORT!,
// //     password: process.env.REDIS_SECRET!,
// //     retryStrategy: times => {
// //         return Math.min(times * 50, 2000);
// //     }
// // }

// // const pubsub = new RedisPubSub({
// //     publisher: new Redis(redisOption),
// //     subscriber: new Redis(redisOption),
// // });

// schedule.scheduleJob("0 * * * * *", async () => {
//   try {
//     // ...doing schedule jobs
//   } catch (e) {
//     console.log("배송정보 처리에서 에러 발생:", e);
//   }
// });

// console.log("The schduler has been initialzed");
