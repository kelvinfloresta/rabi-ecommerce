import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { TableName } from 'src/adapters/database/Database.adapter';
import { IUserGateway, UserBusinessData } from './IUser.gateway';

export class UserGatewayKnexAdapter extends KnexRepositoryHelper<UserBusinessData>
  implements IUserGateway {
  constructor() {
    super(TableName.user);
  }
}
