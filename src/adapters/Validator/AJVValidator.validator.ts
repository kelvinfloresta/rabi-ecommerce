import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';

import { IValidator } from './IValidator.adapter';
import ValidatorError from './ValidatorError.validator';

export default class AJVValidatorAdapter implements IValidator {
  private ajv = new Ajv();

  private compiledSchema: Ajv.ValidateFunction;

  constructor(schema: JSONSchema7) {
    this.compiledSchema = this.ajv.compile(schema);
  }

  validate(data: any) {
    const valid = this.compiledSchema(data);
    if (!valid) {
      const [firstError] = this.compiledSchema.errors || [];
      throw new ValidatorError(`${firstError.dataPath}: ${firstError.message}`);
    }
  }
}
