import KnexBaseGateway from 'src/frameworks/database/knex/knex-adapter.framework';
import Product from 'src/entities/Product.entity';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter extends KnexBaseGateway<Product>
  implements IProductGateway {
  public tableName = ProductGatewayKnexAdapter.tableName;

  public static tableName = 'products';
}
