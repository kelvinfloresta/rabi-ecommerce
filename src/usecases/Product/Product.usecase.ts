import { Product } from 'src/entities/Product.entity';
import { IProductGateway } from 'src/adapters/gateways/Product/IProduct.gateway';
import { ICommonCompanyFilter } from 'src/adapters/gateways/IGateway';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from './IProduct.usecase';

@injectable()
export class ProductCase {
  constructor(@inject(TYPES.ProductGateway) private productGateway: IProductGateway) {}

  async save(input: ISaveProductCaseInput): Promise<string> {
    return this.productGateway.save(input);
  }

  async list(filter: IListProductCaseInput) {
    return this.productGateway.list(filter);
  }

  async get(id: string): Promise<Product | undefined> {
    return this.productGateway.get(id);
  }

  async patchByFilter(filter: ICommonCompanyFilter, input: IPatchProductCaseInput) {
    return this.productGateway.patchByFilter(filter, input);
  }

  async delete(filter: ICommonCompanyFilter) {
    return this.productGateway.hardDelete(filter);
  }
}
