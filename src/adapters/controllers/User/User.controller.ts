import UserCase from 'src/usecases/User/User.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { StatusCode, IRequest, IResponseAsync } from 'src/adapters/controllers/IController';

import Validate from 'src/adapters/Validator/Validate.decorator';
import { UserSaveSchema } from './UserSchema.validator';
import Controller from '../decorators/Controller.decorator';
import Post from '../decorators/Post.decorator';

@Controller('/user')
export default class UserController {
  constructor(private userCase: UserCase) {}

  @Post('/')
  @Validate(UserSaveSchema)
  public async save(request: IRequest<never, ISaveUserCaseInput>): IResponseAsync<string> {
    const response = await this.userCase.save(request.body);
    return { statusCode: StatusCode.ok, response };
  }
}
