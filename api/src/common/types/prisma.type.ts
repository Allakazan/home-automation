import { Prisma } from '@prisma/client';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

// Used to select a field from a Model scalar dynamically (and type-safe)
export type PrismaField<T> = Keys<
  Prisma.Payload<T, 'findUnique' | 'findMany'>['name']
>;
