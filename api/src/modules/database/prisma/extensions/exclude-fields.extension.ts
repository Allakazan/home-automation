import { Prisma } from '@prisma/client';
import { PrismaField } from '@/common/types/prisma.type';

const getModelFields = (model: Prisma.ModelName): Prisma.DMMF.Field[] => {
  return Prisma.dmmf.datamodel.models.find(
    (datamodel) => datamodel.name.toLowerCase() === model.toLowerCase(),
  ).fields;
};

// Extension to exclude fields from any query. It's typesafe !
// https://github.com/prisma/prisma/issues/5042
export const excludeFieldsModel = Prisma.defineExtension((client) =>
  client.$extends({
    model: {
      $allModels: {
        exclude<T>(
          this: T,
          keys: PrismaField<T>[],
        ): Prisma.Args<T, 'findUnique' | 'findMany'>['select'] {
          const context = Prisma.getExtensionContext(this);
          const select: Prisma.Args<T, 'findUnique' | 'findMany'>['select'] =
            {};
          const fields = getModelFields(context.$name as Prisma.ModelName);

          fields.map((field) => {
            if (field.kind !== 'scalar') return;

            select[field.name] = !keys
              .map((key) => key.toString())
              .includes(field.name);
          });

          return select;
        },
      },
    },
  }),
);
