import { Product } from 'src/entities/Product.entity';
import {
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { TableName } from 'src/adapters/database/Database.adapter';
import { IProductGateway } from './IProduct.gateway';
import { ICommonCompanyFilter } from '../IGateway';

export class ProductGatewayKnexAdapter extends KnexRepositoryHelper<Product>
  implements IProductGateway {
  private companyId = `${TableName.product}.companyId`;

  private productId = `${TableName.product}.id`;

  private categoryId = `${TableName.category}.id`;

  private categoryName = `${TableName.category}.name as categoryName`;

  private productName = `${TableName.product}.name`;

  private productDescription = `${TableName.product}.description`;

  constructor() {
    super(TableName.product);
  }

  async patchByFilter(
    filter: ICommonCompanyFilter,
    input: IPatchProductCaseInput
  ): Promise<boolean> {
    return super.updateByFilter(filter, input);
  }

  async listByFilter(filter: IListProductCaseInput): Promise<Product[]> {
    return super.instance
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
