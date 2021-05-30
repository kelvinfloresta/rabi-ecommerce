import { Product } from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { TableName } from 'src/adapters/database/Database.adapter';
import { IProductGateway } from './IProduct.gateway';
import { ICommonCompanyFilter } from '../IGateway';

export class ProductGatewayKnexAdapter implements IProductGateway {
  private repository = new KnexRepositoryHelper<Product>(TableName.product);

  private companyId = `${TableName.product}.companyId`;

  private productId = `${TableName.product}.id`;

  private categoryId = `${TableName.category}.id`;

  private categoryName = `${TableName.category}.name as categoryName`;

  private productName = `${TableName.product}.name`;

  private productDescription = `${TableName.product}.description`;

  async hardDelete(filter: ICommonCompanyFilter): Promise<boolean> {
    return this.repository.hardDelete(filter);
  }

  async patchByFilter(
    filter: ICommonCompanyFilter,
    input: IPatchProductCaseInput
  ): Promise<boolean> {
    return this.repository.updateByFilter(filter, input);
  }

  async get(id: string): Promise<Product | undefined> {
    return this.repository.getById(id);
  }

  async save(input: ISaveProductCaseInput) {
    return this.repository.save(input);
  }

  async list(filter: IListProductCaseInput): Promise<Product[]> {
    return this.repository.instance
      .select(
        this.companyId,
        this.productId,
        this.categoryName,
        this.productName,
        this.productDescription,
        'categoryId',
        'active',
        'price'
      )
      .leftJoin(TableName.category, this.categoryId, 'categoryId')
      .where(this.companyId, filter.companyId);
  }
}
