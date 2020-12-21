import { StatusCode, IRequest, IResponseAsync } from 'src/adapters/controllers/IController';

import { CategoryCase } from 'src/usecases/Category/Category.usecase';
import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { Category } from 'src/entities/Category.entity';
import { Controller } from '../decorators/Controller.decorator';
import { Post } from '../decorators/Post.decorator';
import { Get } from '../decorators/Get.decorator';
import { Delete } from '../decorators/Delete.decorator';

@Controller('/category')
export class CategoryController {
  constructor(private categoryCase: CategoryCase, private authCase: AuthCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.categoryCase.save({ ...request.body, companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Get('/')
  public async list(request: IRequest): IResponseAsync<Category[]> {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
    const response = await this.categoryCase.list({ companyId });
    return { statusCode: StatusCode.ok, response };
  }

  @Delete('/:id')
  public async delete(request: IRequest): IResponseAsync {
    const { companyId } = this.authCase.authenticate(request.headers.authorization);
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
