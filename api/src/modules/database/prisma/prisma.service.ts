import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import {
  softDeleteModel,
  softDeleteQuery,
} from './extensions/soft-delete.extension';

// Needed to create a custom client to run model/result functions
// https://github.com/prisma/prisma/discussions/21361
export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(softDeleteModel);
};

type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  extendedPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.extendedPrismaClient)
      this.extendedPrismaClient = customPrismaClient(this);

    return this.extendedPrismaClient;
  }

  async onModuleInit() {
    await this.$connect();

    // Here i can add any other extends that isn't a model/result
    Object.assign(this, this.$extends(softDeleteQuery));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
