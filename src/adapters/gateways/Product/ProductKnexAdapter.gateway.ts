import Product from 'src/entities/Product.entity';
import KnexBaseGateway from 'src/frameworks/database/knex/knex-adapter.framework';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter extends KnexBaseGateway implements IProductGateway {
  public tableName = ProductGatewayKnexAdapter.tableName;

  public static tableName = 'products';

  get = KnexBaseGateway.makeGet<Product>();

  save = ProductGatewayKnexAdapter.makeSave<Product>('*');

  patch = KnexBaseGateway.makePatch<Product>(['id', 'name', 'description', 'price', 'disabled']);

  delete = KnexBaseGateway.makeLogicDelete();
}
