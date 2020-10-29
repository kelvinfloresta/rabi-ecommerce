import * as jwt from 'jsonwebtoken';
import User from 'src/entities/User.entity';
import NotAuthorized from 'src/utils/errors/NotAuthorized.error';
import Encrypt from 'src/utils/Encrypt.util';
import UserCase from '../User/User.usecase';

export class AuthCase {
  private readonly jwt = jwt;

  constructor(
    private readonly secretKey: string,
    private readonly userCase: UserCase,
    private readonly encrypt: typeof Encrypt
  ) {}

  private sign(email: string) {
    return this.jwt.sign({ email }, this.secretKey);
  }

  public authenticate(token: string) {
    this.jwt.verify(token, this.secretKey);
  }

  public async login(credentials: Pick<User, 'email' | 'password'>) {
    const user = await this.userCase.findByEmail(credentials.email);
    if (!user) {
      throw new NotAuthorized('Email not found');
    }

    const isValid = this.encrypt.compare(user.password, credentials.password);
    if (!isValid) {
      throw new NotAuthorized('Wrong password');
    }

    const token = this.sign(user.email);
    return token;
  }
}
