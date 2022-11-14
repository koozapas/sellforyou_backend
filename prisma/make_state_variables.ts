import { config } from 'dotenv'
config()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 상품 업로드 상태 생성
    const a = await prisma.productStoreState.findMany();
    console.log(`export enum ProductStoreStateEnum {${a.map(v => `

    /**
     * ${v.description}
     */
    ${v.name} = ${v.id.toString()}`)}\n}`)

}

main().finally(async () => {
    await prisma.$disconnect()
})
