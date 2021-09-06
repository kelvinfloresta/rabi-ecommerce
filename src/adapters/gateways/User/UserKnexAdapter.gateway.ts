import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { User } from 'src/entities/User.entity';
import { TableName } from 'src/adapters/database/Database.adapter';
import { IUserGateway } from './IUser.gateway';

export class UserGatewayKnexAdapter extends KnexRepositoryHelper<User> implements IUserGateway {
  constructor() {
    super(TableName.user);
  }
}
