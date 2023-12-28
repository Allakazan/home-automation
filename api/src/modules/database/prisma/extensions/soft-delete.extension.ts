import { Prisma } from '@prisma/client';

const hasSoftDelete = (model: string) => {
  const fields: Prisma.DMMF.Field[] = Prisma.dmmf.datamodel.models.find(
    (datamodel) => datamodel.name.toLowerCase() === model.toLowerCase(),
  ).fields;

  return fields.findIndex((field) => field.name === 'archived') >= 0;
};

export const softDeleteModel = Prisma.defineExtension((client) =>
  client.$extends({
    model: {
      $allModels: {
        async softDelete<M, A>(
          this: M,
          where: Prisma.Args<M, 'update'>['where'],
        ): Promise<Prisma.Result<M, A, 'update'>> {
          const context = Prisma.getExtensionContext(this);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (context as any).update({
            where,
            data: {
              archived: true,
            },
          });
        },
      },
    },
  }),
);

export const softDeleteQuery = Prisma.defineExtension((client) =>
  client.$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        if (
          hasSoftDelete(model) &&
          ['findUnique', 'findMany', 'count'].includes(operation)
        ) {
          args.where = { ...args.where, archived: false };
        }

        return query(args);
      },
    },
  }),
);
