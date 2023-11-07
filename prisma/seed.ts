import { config } from "dotenv";
config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hashSync } from "bcryptjs";

async function hookFunc() {}

async function main() {
  return hookFunc();

  const password = hashSync("qwer123$", 10);
  await prisma.admin.create({ data: { loginId: "admin@itez.io", password, state: "ACTIVE" } });

  await prisma.setting.create({ data: { name: "CNY_RATE", value: "171.53" } });
  await prisma.setting.create({ data: { name: "TAOBAO_PRODUCT_REFRESH_DAY", value: "0" } });
  await prisma.productStoreState.createMany({
    data: [
      { id: 1, name: "REGISTER_REQUESTED", description: "상품 업로드 요청" },
      { id: 2, name: "ON_SELL", description: "판매중" },
      { id: 3, name: "REGISTER_FAILED", description: "상품 업로드 실패" },
    ],
  });
  await prisma.planInfo.createMany({
    data: [
      {
        name: "1단계",
        description: "1단계에 대한 설명\n1단계에 대한 설명",
        month: 1,
        planLevel: 1,
        externalFeatureVariableId: null,
        price: 10000,
      },
      {
        name: "2단계",
        description: "2단계에 대한 설명\n2단계에 대한 설명",
        month: 1,
        planLevel: 2,
        externalFeatureVariableId: null,
        price: 10000,
      },
      {
        name: "3단계",
        description: "3단계에 대한 설명\n3단계에 대한 설명",
        month: 1,
        planLevel: 3,
        externalFeatureVariableId: null,
        price: 10000,
      },
      {
        name: "4단계",
        description: "4단계에 대한 설명\n4단계에 대한 설명",
        month: 1,
        planLevel: 4,
        externalFeatureVariableId: null,
        price: 10000,
      },
    ],
  });
  // await prisma.admin.create({ data: { id: "admin@itez.io", password, state: "ACTIVE", permission: "qwer123$" } });
}

main().finally(async () => {
  await prisma.$disconnect();
});
