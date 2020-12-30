import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { User } from 'src/entities/User.entity';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { IUserGateway } from './IUser.gateway';

export class UserGatewayKnexAdapter implements IUserGateway {
  constructor(private repository: KnexRepositoryHelper<User>) {}

  get(id: string): Promise<User | undefined> {
    return this.repository.getById(id);
  }

  save(input: ISaveUserCaseInput): Promise<string> {
    return this.repository.save(input);
  }

  getByFilter(filter: Partial<User>) {
    return this.repository.getByFilter(filter);
  }
}
