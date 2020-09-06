import { JSONSchema7 } from 'json-schema';

export interface IValidator {
  validate(data: any): void;
}

export type IValidatorConstructor = new (schema: JSONSchema7) => IValidator;
