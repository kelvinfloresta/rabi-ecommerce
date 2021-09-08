import { TableName } from 'src/adapters/database/Database.adapter';
import { CategoryBusinessData } from 'src/adapters/gateways/Category/ICategory.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';

import { ICategoryGateway } from './ICategory.gateway';

export class CategoryGatewayKnexAdapter extends KnexRepositoryHelper<CategoryBusinessData>
  implements ICategoryGateway {
  constructor() {
    super(TableName.category);
  }
}
