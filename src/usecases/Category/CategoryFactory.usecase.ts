import { CategoryGatewayKnexAdapter } from 'src/adapters/gateways/Category/CategoryKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-adapter.framework';
import { Category } from 'src/entities/Category.entity';
import { TableName } from 'src/adapters/database/Database.adapter';
import { CategoryCase } from './Category.usecase';

export class CategoryCaseFactory {
  public static readonly singleton = CategoryCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<Category>(TableName.category);
    const productGateway = new CategoryGatewayKnexAdapter(repository);
    return new CategoryCase(productGateway);
  }
}
