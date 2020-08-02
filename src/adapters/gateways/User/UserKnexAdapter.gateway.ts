import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import User from 'src/entities/User.entity';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import IUserGateway from './IUser.gateway';

export default class UserGatewayKnexAdapter implements IUserGateway {
  public static readonly tableName = 'users';

  constructor(private repository: KnexRepositoryHelper<User>) {}

  get(id: string): Promise<User> {
    return this.repository.getById(id);
  }

  save(input: ISaveUserCaseInput): Promise<string> {
    return this.repository.save(input);
  }

  getByFilter(filter: Partial<User>) {
    return this.repository.getByFilter(filter);
  }
}
