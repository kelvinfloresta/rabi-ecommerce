import {
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { TableName } from 'src/adapters/database/Database.adapter';
import { IProductGateway, ProductBusinessData } from './IProduct.gateway';
import { ICommonCompanyFilter } from '../IGateway';

export class ProductGatewayKnexAdapter extends KnexRepositoryHelper<ProductBusinessData>
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

  async listByFilter(filter: IListProductCaseInput): Promise<ProductBusinessData[]> {
    const query = super.instance
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
      .leftJoin(TableName.category, this.categoryId, 'categoryId');

    if (filter.companyId) {
      query.where(this.companyId, filter.companyId);
    }

    if (filter.ids !== undefined && filter.ids.length !== 0) {
      query.where('id', filter.ids);
    }

    return query;
  }
}
