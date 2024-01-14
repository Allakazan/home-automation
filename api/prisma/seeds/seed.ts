import { PrismaClient } from '@prisma/client';
import { deviceTypeData } from './data/device-type';
import { hashed } from '../../src/common/directives/crypto.directive';

const prisma = new PrismaClient();

async function main() {
  // User
  const userEmail = 'brunorizzardi80014@hotmail.com';
  await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      name: 'Admin',
      email: userEmail,
      password: await hashed('QbTzkzYwbYeg'),
    },
  });

  // Room
  const roomId = 'clqpjia6j000008jv5gl38cz5';
  await prisma.room.upsert({
    where: { id: roomId },
    update: {},
    create: {
      id: roomId,
      name: 'Default',
      user: {
        connect: { email: userEmail },
      },
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
