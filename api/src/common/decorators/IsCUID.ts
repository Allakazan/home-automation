import {
  registerDecorator,
  buildMessage,
  ValidationOptions,
} from 'class-validator';

export function IsCUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCuid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Maybe this will need a change on the future
          // https://github.com/paralleldrive/cuid/issues/88#issuecomment-1282288268
          return /^c[a-z0-9]{24}$/.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a valid CUID`,
          validationOptions,
        ),
      },
    });
  };
}
