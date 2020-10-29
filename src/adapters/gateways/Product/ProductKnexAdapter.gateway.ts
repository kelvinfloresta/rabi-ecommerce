import Product from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IPaginateProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import { IPaginationParams } from 'src/usecases/IPaginate';
import IProductGateway from './IProduct.gateway';

export class ProductGatewayKnexAdapter implements IProductGateway {
  public static readonly tableName = 'products';

  constructor(private repository: KnexRepositoryHelper<Product>) {}

  async logicDelete(id: string): Promise<boolean> {
    return this.repository.logicDelete(id);
  }

  async patch(input: IPatchProductCaseInput) {
    const result = await this.repository.updateById(input.id, input);
    return result > 0;
  }

  async get(id: string): Promise<Product> {
    return this.repository.getById(id);
  }

  async save(input: ISaveProductCaseInput) {
    return this.repository.save(input);
  }

  async paginate(filter: IPaginateProductCaseInput, paginate: IPaginationParams) {
    return this.repository.paginateByFilter(filter, paginate);
  }
}
