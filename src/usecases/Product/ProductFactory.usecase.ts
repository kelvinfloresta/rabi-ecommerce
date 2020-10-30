import { ProductGatewayKnexAdapter } from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { Product } from 'src/entities/Product.entity';
import { TableName } from 'src/adapters/database/Database.adapter';
import { ProductCase } from './Product.usecase';

export function ProductCaseFactory() {
  const repository = new KnexRepositoryHelper<Product>(TableName.product);
  const productGateway = new ProductGatewayKnexAdapter(repository);
  return new ProductCase(productGateway);
}
