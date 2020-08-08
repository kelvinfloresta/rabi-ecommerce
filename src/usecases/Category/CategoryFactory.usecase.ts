import CategoryGatewayKnexAdapter from 'src/adapters/gateways/Category/CategoryKnexAdapter.gateway';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import Category from 'src/entities/Category.entity';
import CategoryCase from './Category.usecase';

export default class CategoryCaseFactory {
  public static readonly singleton = CategoryCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<Category>(CategoryGatewayKnexAdapter.tableName);
    const productGateway = new CategoryGatewayKnexAdapter(repository);
    return new CategoryCase(productGateway);
  }
}
