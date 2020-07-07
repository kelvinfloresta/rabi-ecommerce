import Product from 'src/entities/Product.entity';
import IProductGateway from 'src/adapters/gateways/Product/IProduct.gateway';

export default class ProductCase {
  constructor(private productGateway: IProductGateway) {}

  async save(input: Pick<Product, 'name' | 'description' | 'price'>) {
    return this.productGateway.save(input);
  }
}
