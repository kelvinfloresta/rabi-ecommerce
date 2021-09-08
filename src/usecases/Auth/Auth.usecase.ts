import * as jwt from 'jsonwebtoken';
import { NotAuthorized } from 'src/utils/errors/NotAuthorized.error';
import { inject, injectable } from 'src/adapters/di';
import { config } from 'src/config';
import { IEncrypt } from 'src/adapters/encrypt/IEncrypt';
import { TYPES } from 'src/adapters/di/types';
import { UserBusinessData } from 'src/adapters/gateways/User/IUser.gateway';
import { UserCase } from '../User/User.usecase';
import { IAuthUser } from './IAuth.usecase';

@injectable()
export class AuthCase {
  private readonly jwt = jwt;

  private readonly secretKey = config.secretKey;

  constructor(
    private readonly userCase: UserCase,
    @inject(TYPES.Encrypt) private readonly encrypt: IEncrypt
  ) {}

  private sign(params: { email: string; userId: string; companyId: string | null }) {
    return this.jwt.sign(params, this.secretKey);
  }

  public authenticate(token: string): Promise<IAuthUser> {
    return this.verify(token);
  }

  private verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jwt.verify(token, this.secretKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        return resolve(decoded);
      });
    });
  }

  public async login(credentials: Pick<UserBusinessData, 'email' | 'password'>) {
    const user = await this.userCase.findByEmail(credentials.email);
    if (!user) {
      throw new NotAuthorized('Email not found');
    }

    const isValid = this.encrypt.compare(user.password, credentials.password);
    if (!isValid) {
      throw new NotAuthorized('Wrong password');
    }

    const token = this.sign({ email: user.email, userId: user.id, companyId: user.companyId });
    return token;
  }
}
