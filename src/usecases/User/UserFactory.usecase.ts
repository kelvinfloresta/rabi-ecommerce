import { UserGatewayKnexAdapter } from 'src/adapters/gateways/User/UserKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-adapter.framework';
import { User } from 'src/entities/User.entity';
import { Encrypt } from 'src/utils/Encrypt.util';
import { TableName } from 'src/adapters/database/Database.adapter';
import { UserCase } from './User.usecase';

export class UserCaseFactory {
  public static readonly singleton = UserCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<User>(TableName.user);
    const UserGateway = new UserGatewayKnexAdapter(repository);
    return new UserCase(UserGateway, Encrypt);
  }
}
