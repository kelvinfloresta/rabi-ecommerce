import { TableName } from 'src/adapters/database/Database.adapter';
import { Category } from 'src/entities/Category.entity';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import { ICategoryGateway } from './ICategory.gateway';

export class CategoryGatewayKnexAdapter implements ICategoryGateway {
  private repository = new KnexRepositoryHelper<Category>(TableName.category);

  public async get(id: string): Promise<Category | undefined> {
    return this.repository.getById(id);
  }

  public async save(input: ISaveCategoryCaseInput): Promise<string> {
    return this.repository.save(input);
  }

  public async listByFilter(filter: IListCategoryCaseInput): Promise<Category[]> {
    return this.repository.listByFilter(filter);
  }

  public async hardDelete(filter: IHardDeleteCategoryCaseInput): Promise<boolean> {
    return this.repository.hardDelete(filter);
  }
}
