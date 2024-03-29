import { IUserGateway, UserBusinessData } from 'src/adapters/gateways/User/IUser.gateway';
import { TYPES } from 'src/adapters/di/types';
import { inject, injectable } from 'src/adapters/di';
import { IEncrypt } from 'src/adapters/encrypt/IEncrypt';
import { Id } from 'src/adapters/gateways/IGateway';
import { ISaveUserCaseInput } from './IUser.usecase';

@injectable()
export class UserCase {
  constructor(
    @inject(TYPES.UserGateway) private userGateway: IUserGateway,
    @inject(TYPES.Encrypt) private encrypt: IEncrypt
  ) {}

  async save(input: ISaveUserCaseInput): Promise<string> {
    const encryptedPassword = await this.encrypt.encrypt(input.password);
    return this.userGateway.create({ ...input, password: encryptedPassword });
  }

  async getById(id: Id): Promise<UserBusinessData | undefined> {
    return this.userGateway.getById(id);
  }

  async findByEmail(email: string): Promise<UserBusinessData | undefined> {
    return this.userGateway.getByFilter({ email });
  }
}
