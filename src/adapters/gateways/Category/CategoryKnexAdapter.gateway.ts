import { TableName } from 'src/adapters/database/Database.adapter';
import { Category } from 'src/entities/Category.entity';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';

import { ICategoryGateway } from './ICategory.gateway';

export class CategoryGatewayKnexAdapter extends KnexRepositoryHelper<Category>
  implements ICategoryGateway {
  constructor() {
    super(TableName.category);
  }
}
