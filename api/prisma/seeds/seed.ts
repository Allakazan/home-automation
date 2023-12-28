import { PrismaClient } from '@prisma/client';
import { deviceTypeData } from './data/device-type';

const prisma = new PrismaClient();

async function main() {
  // Room
  const roomId = 'clqpjia6j000008jv5gl38cz5';
  await prisma.room.upsert({
    where: { id: roomId },
    update: {},
    create: {
      id: roomId,
      name: 'Default',
    },
  });

  // Device Item Type
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
