import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/User.entity';
import { NotAuthorized } from 'src/utils/errors/NotAuthorized.error';
import { Encrypt } from 'src/utils/Encrypt.util';
import { UserCase } from '../User/User.usecase';

export class AuthCase {
  private readonly jwt = jwt;

  constructor(
    private readonly secretKey: string,
    private readonly userCase: UserCase,
    private readonly encrypt: typeof Encrypt
  ) {}

  private sign(params: { email: string; userId: string; companyId: string | null }) {
    return this.jwt.sign(params, this.secretKey);
  }

  public authenticate(token: string): { companyId: string; email: string } {
    return this.jwt.verify(token, this.secretKey) as any;
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

    const token = this.sign({ email: user.email, userId: user.id, companyId: user.companyId });
    return token;
  }
}
