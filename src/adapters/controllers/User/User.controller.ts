/* eslint-disable max-classes-per-file */
import UserCase from 'src/usecases/User/User.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { StatusCode, IResponse, IRequest } from 'src/adapters/controllers/IController';

import { IValidator, IValidatorConstructor } from 'src/adapters/Validator/IValidator.adapter';
import { Controller, Post } from '../Route.decorator';
import { UserSaveSchema } from './UserValidator.controller';

@Controller('/user')
export default class UserController {
  saveSchemaValidator: IValidator;

  constructor(private userCase: UserCase, Validator: IValidatorConstructor) {
    this.saveSchemaValidator = new Validator(UserSaveSchema);
  }

  @Post('/')
  public async save(request: IRequest<any, ISaveUserCaseInput>): IResponse<string> {
    this.saveSchemaValidator.validate(request);
    const response = await this.userCase.save(request.body);
    return [StatusCode.ok, response];
  }
}
