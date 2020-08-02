import IUserGateway from 'src/adapters/gateways/User/IUser.gateway';
import User from 'src/entities/User.entity';
import { ISaveUserCaseInput } from './IUser.usecase';

export default class UserCase {
  constructor(private userGateway: IUserGateway) {}

  async save(input: ISaveUserCaseInput): Promise<string> {
    return this.userGateway.save(input);
  }

  async get(id: string): Promise<User> {
    return this.userGateway.get(id);
  }
}
