import { JSONSchema7 } from 'json-schema';
import { AJVValidatorAdapter } from './AJVValidator.validator';

export function Validate(schema: JSONSchema7) {
  const validator = new AJVValidatorAdapter(schema);

  return function decorator(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function withValidate(param: any) {
      validator.validate(param);
      return originalMethod.call(this, param);
    };
  };
}
