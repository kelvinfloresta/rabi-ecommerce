/* eslint-disable max-classes-per-file */
import UserCase from 'src/usecases/User/User.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { StatusCode, IResponse, IRequest } from 'src/adapters/controllers/IController';

import Validate from 'src/adapters/Validator/Validate.decorator';
import { Controller, Post } from '../Route.decorator';
import { UserSaveSchema } from './UserValidator.controller';

@Controller('/user')
export default class UserController {
  constructor(private userCase: UserCase) {}

  @Post('/')
  @Validate(UserSaveSchema)
  public async save(request: IRequest<any, ISaveUserCaseInput>): IResponse<string> {
    const response = await this.userCase.save(request.body);
    return [StatusCode.ok, response];
  }
}
