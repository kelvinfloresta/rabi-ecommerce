import UserCase from 'src/usecases/User/User.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { StatusCode, IResponse, IRequest } from 'src/adapters/controllers/IController';
import { Controller, Post } from './Route.decorator';

@Controller('/user')
export default class UserController {
  constructor(private userCase: UserCase) {}

  @Post('/')
  public async save(request: IRequest<any, ISaveUserCaseInput>): IResponse<string> {
    const response = await this.userCase.save(request.body);
    return [StatusCode.ok, response];
  }
}
