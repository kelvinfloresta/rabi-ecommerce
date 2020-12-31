import { Product } from 'src/entities/Product.entity';
import { IProductGateway } from 'src/adapters/gateways/Product/IProduct.gateway';
import { ICommonCompanyFilter } from 'src/adapters/gateways/IGateway';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IPaginateProductCaseInput,
} from './IProduct.usecase';
import { IPagination } from '../IPaginate';

export class ProductCase {
  constructor(private productGateway: IProductGateway) {}

  async save(input: ISaveProductCaseInput): Promise<string> {
    return this.productGateway.save(input);
  }

  async paginate(filter: IPaginateProductCaseInput, paginate: IPagination) {
    return this.productGateway.paginate(filter, paginate);
  }

  async get(id: string): Promise<Product | undefined> {
    return this.productGateway.get(id);
  }

  async patch(input: IPatchProductCaseInput) {
    await this.productGateway.patch(input);
  }

  async delete(filter: ICommonCompanyFilter) {
    return this.productGateway.hardDelete(filter);
  }
}
