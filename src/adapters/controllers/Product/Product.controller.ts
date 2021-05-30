import {
  StatusCode,
  IRequest,
  IResponseAsync,
  IEmptyResponse,
} from 'src/adapters/controllers/IController';

import { ProductCase } from 'src/usecases/Product/Product.usecase';
import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { Product } from 'src/entities/Product.entity';
import { injectable } from 'src/adapters/di';
import { Controller } from '../decorators/Controller.decorator';
import { Post } from '../decorators/Post.decorator';
import { Get } from '../decorators/Get.decorator';
import { Delete } from '../decorators/Delete.decorator';
import { Patch } from '../decorators/Patch.decorator';

@Controller('/product')
@injectable()
export class ProductController {
  constructor(private productCase: ProductCase, private authCase: AuthCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.productCase.save({ companyId, ...request.body });
    return { statusCode: StatusCode.ok, response };
  }

  @Patch('/:id')
  public async toggleActive(request: IRequest): Promise<IEmptyResponse> {
    const { body, headers, params } = request;
    const { companyId } = this.authCase.authenticate(headers.authorization);
    const hasPatched = await this.productCase.patchByFilter(
      {
        companyId,
        id: params.id,
      },
      body
    );

    if (hasPatched) {
      return { statusCode: StatusCode.noContent };
    }

    return { statusCode: StatusCode.notFound };
  }

  @Get('/')
  public async list(request: IRequest): IResponseAsync<Product[]> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.productCase.list({ companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Delete('/:id')
  public async delete(request: IRequest): Promise<IEmptyResponse> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.productCase.delete({
      companyId,
      id: request.params.id,
    });

    if (!response) {
      return { statusCode: StatusCode.notFound };
    }

    return { statusCode: StatusCode.noContent };
  }
}
