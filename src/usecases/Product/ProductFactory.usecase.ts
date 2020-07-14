import ProductGatewayKnexAdapter from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import Product from 'src/entities/Product.entity';
import ProductCase from './Product.usecase';

export default function ProductCaseFactory() {
  const repository = new KnexRepositoryHelper<Product>(ProductGatewayKnexAdapter.tableName);
  const productGateway = new ProductGatewayKnexAdapter(repository);
  return new ProductCase(productGateway);
}
