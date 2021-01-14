import { OrderCase } from 'src/usecases/Order/Order.usecase';
import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { Post } from '../decorators/Post.decorator';
import { Controller } from '../decorators/Controller.decorator';
import { IRequest, IResponseAsync, StatusCode } from '../IController';

@Controller('/order')
export class OrderController {
  constructor(private orderCase: OrderCase, private authCase: AuthCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.orderCase.create({ ...request.body, companyId });
    return { statusCode: StatusCode.ok, response };
  }
}
