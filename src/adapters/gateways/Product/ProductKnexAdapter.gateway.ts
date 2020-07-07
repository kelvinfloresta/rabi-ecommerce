import Product from 'src/entities/Product.entity';
import db from 'src/adapters/database/Database.adapter';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter implements IProductGateway {
  private db = db(ProductGatewayKnexAdapter.tableName);

  public static tableName = 'products';

  async save(input: Pick<Product, 'description' | 'name' | 'price'>): Promise<Product> {
    const [result] = await this.db.insert(input).returning(['id', 'name', 'description', 'price', 'disabled']);
    return result;
  }
}
