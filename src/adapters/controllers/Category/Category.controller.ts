import {
  StatusCode,
  IRequest,
  IResponseAsync,
  IEmptyResponse,
} from 'src/adapters/controllers/IController';

import { CategoryCase } from 'src/usecases/Category/Category.usecase';
import { CategoryBusinessData } from 'src/adapters/gateways/Category/ICategory.gateway';
import { injectable } from 'src/adapters/di';
import { Controller } from '../decorators/Controller.decorator';
import { Post } from '../decorators/Post.decorator';
import { Get } from '../decorators/Get.decorator';
import { Delete } from '../decorators/Delete.decorator';

@Controller('/category')
@injectable()
export class CategoryController {
  constructor(private categoryCase: CategoryCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const { companyId } = await request.authenticate();
    const response = await this.categoryCase.save({ ...request.body, companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Get('/')
  public async list(request: IRequest): IResponseAsync<CategoryBusinessData[]> {
    const { companyId } = await request.authenticate();
    const response = await this.categoryCase.list({ companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Delete('/:id')
  public async delete(request: IRequest): Promise<IEmptyResponse> {
    const { companyId } = await request.authenticate();
    const response = await this.categoryCase.delete({
      companyId,
      id: request.params.id,
    });

    if (!response) {
      return { statusCode: StatusCode.notFound };
    }

    return { statusCode: StatusCode.noContent };
  }
}
