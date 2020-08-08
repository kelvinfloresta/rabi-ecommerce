import Category from 'src/entities/Category.entity';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import { ISaveCategoryCaseInput } from 'src/usecases/Category/ICategory.usecase';
import ICategoryGateway from './ICategory.gateway';

export default class CategoryGatewayKnexAdapter implements ICategoryGateway {
  public static readonly tableName = 'categories';

  constructor(private readonly repository: KnexRepositoryHelper<Category>) {}

  public async get(id: string): Promise<Category> {
    return this.repository.getById(id);
  }

  public async save(input: ISaveCategoryCaseInput): Promise<string> {
    return this.repository.save(input);
  }
}
