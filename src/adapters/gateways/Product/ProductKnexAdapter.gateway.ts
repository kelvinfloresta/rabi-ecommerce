import Product from 'src/entities/Product.entity';
import KnexInstance from 'src/frameworks/database/knex/knex-adapter.framework';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter extends KnexInstance implements IProductGateway {
  public tableName = 'products';

  public static tableName = 'products';

  async get(id: string): Promise<Product> {
    return this.instance.select().where({ id }).first();
  }

  async save(input: Product): Promise<Product> {
    const [result] = await this.instance.insert(input).returning(['id', 'name', 'description', 'price', 'disabled']);
    return result;
  }

  async patch(id: string, input: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const [result] = await this.instance.update(input).where({ id }).returning(['id', 'name', 'description', 'price', 'disabled']);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.instance.where({ id }).update({ deletedAt: new Date() });
    return result > 0;
  }
}
