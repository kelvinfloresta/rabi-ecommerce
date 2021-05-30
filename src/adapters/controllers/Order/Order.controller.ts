import { OrderCase } from 'src/usecases/Order/Order.usecase';
import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { IListOrderCaseOutput } from 'src/usecases/Order/IOrder.usecase';
import { injectable } from 'src/adapters/di';
import { Post } from '../decorators/Post.decorator';
import { Controller } from '../decorators/Controller.decorator';
import { IRequest, IResponseAsync, StatusCode } from '../IController';
import { Get } from '../decorators/Get.decorator';

@Controller('/order')
@injectable()
export class OrderController {
  constructor(private orderCase: OrderCase, private authCase: AuthCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.orderCase.create({ ...request.body, companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Get('/')
  public async list(request: IRequest): IResponseAsync<IListOrderCaseOutput[]> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.orderCase.list({ companyId });
    return { statusCode: StatusCode.ok, response };
  }
}
