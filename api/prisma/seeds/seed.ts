import { PrismaClient } from '@prisma/client';
import { deviceTypeData } from './data/device-type';

const prisma = new PrismaClient();

async function main() {
  for (const deviceTypeItem of deviceTypeData) {
    await prisma.deviceType.upsert(deviceTypeItem);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
