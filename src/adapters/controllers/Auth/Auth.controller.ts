import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { StatusCode, IRequest, IResponseAsync } from 'src/adapters/controllers/IController';

import { injectable } from 'src/adapters/di';
import { Controller } from '../decorators/Controller.decorator';
import { Post } from '../decorators/Post.decorator';

@Controller('/auth')
@injectable()
export class AuthController {
  constructor(private authCase: AuthCase) {}

  @Post('/')
  public async login(request: IRequest): IResponseAsync<string> {
    const response = await this.authCase.login(request.body);
    return { statusCode: StatusCode.ok, response };
  }
}
