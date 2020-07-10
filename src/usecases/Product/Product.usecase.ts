import Product from 'src/entities/Product.entity';
import IProductGateway from 'src/adapters/gateways/Product/IProduct.gateway';

export default class ProductCase {
  constructor(private productGateway: IProductGateway) {}

  async save(input: Product): Promise<Product> {
    return this.productGateway.save(input);
  }

  async get(id: string): Promise<Product> {
    return this.productGateway.get(id);
  }

  async patch(id: string, input: Partial<Omit<Product, 'id'>>) {
    return this.productGateway.patch(id, input);
  }

  async delete(id: string) {
    return this.productGateway.delete(id);
  }
}
