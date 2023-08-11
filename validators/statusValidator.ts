import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStatus(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const allowedValues = ['PENDING', 'IN PROGRESS', 'DONE'];
          return allowedValues.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be one of the following values: PENDING, IN PROGRESS, DONE`;
        },
      },
    });
  };
}
