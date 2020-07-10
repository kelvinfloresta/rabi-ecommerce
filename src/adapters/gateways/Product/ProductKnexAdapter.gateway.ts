import Product from 'src/entities/Product.entity';
import db from 'src/adapters/database/Database.adapter';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter implements IProductGateway {
  private db = db(ProductGatewayKnexAdapter.tableName);

  public static tableName = 'products';

  async save(input: Product): Promise<Product> {
    const [result] = await this.db.insert(input).returning(['id', 'name', 'description', 'price', 'disabled']);
    return result;
  }

  async patch(id: string, input: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const [result] = await this.db.update(input).where({ id }).returning(['id', 'name', 'description', 'price', 'disabled']);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.update({ deleted: true }).where({ id });
    return result > 0;
  }
}
