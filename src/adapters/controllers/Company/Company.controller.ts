import { StatusCode, IRequest, IResponseAsync } from 'src/adapters/controllers/IController';

import { CompanyCase } from 'src/usecases/Company/Company.usecase';
import { Controller } from '../decorators/Controller.decorator';
import { Post } from '../decorators/Post.decorator';

@Controller('/company')
export class CompanyController {
  constructor(private companyCase: CompanyCase) {}

  @Post('/')
  public async create(request: IRequest): IResponseAsync<string> {
    const response = await this.companyCase.save(request.body);
    return { statusCode: StatusCode.ok, response };
  }
}
