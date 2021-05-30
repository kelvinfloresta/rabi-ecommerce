import { IUserGateway } from 'src/adapters/gateways/User/IUser.gateway';
import { User } from 'src/entities/User.entity';
import { TYPES } from 'src/adapters/di/types';
import { Encrypt } from 'src/utils/Encrypt.util';
import { inject, injectable } from 'src/adapters/di';
import { ISaveUserCaseInput } from './IUser.usecase';

@injectable()
export class UserCase {
  constructor(
    @inject(TYPES.UserGateway) private userGateway: IUserGateway,
    @inject(Encrypt) private encrypt: typeof Encrypt
  ) {}

  async save(input: ISaveUserCaseInput): Promise<string> {
    const encryptedPassword = this.encrypt.encrypt(input.password);
    return this.userGateway.save({ ...input, password: encryptedPassword });
  }

  async get(id: string): Promise<User | undefined> {
    return this.userGateway.get(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userGateway.getByFilter({ email });
  }
}
