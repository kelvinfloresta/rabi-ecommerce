import Product from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
} from 'src/usecases/Product/IProduct,usecase';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import IProductGateway from './IProduct.gateway';

export default class ProductGatewayKnexAdapter implements IProductGateway {
  public static readonly tableName = 'product';

  constructor(private repository: KnexRepositoryHelper<Product>) {}

  async logicDelete(id: string): Promise<boolean> {
    return this.repository.logicDelete(id);
  }

  async patch(input: IPatchProductCaseInput): Promise<void> {
    return this.repository.updateById(input.id, input);
  }

  async get(id: string): Promise<Product> {
    return this.repository.getById(id);
  }

  async save(input: ISaveProductCaseInput) {
    return this.repository.save(input);
  }
}
