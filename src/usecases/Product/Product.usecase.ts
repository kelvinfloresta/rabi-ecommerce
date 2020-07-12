import Product from 'src/entities/Product.entity';
import IProductGateway from 'src/adapters/gateways/Product/IProduct.gateway';
import { ISaveProductCaseInput, IPatchProductCaseInput } from './IProduct,usecase';

export default class ProductCase {
  constructor(private productGateway: IProductGateway) {}

  async save(input: ISaveProductCaseInput): Promise<string> {
    return this.productGateway.save(input);
  }

  async get(id: string): Promise<Product> {
    return this.productGateway.get(id);
  }

  async patch(input: IPatchProductCaseInput) {
    await this.productGateway.patch(input);
  }

  async delete(id: string) {
    return this.productGateway.logicDelete(id);
  }
}
