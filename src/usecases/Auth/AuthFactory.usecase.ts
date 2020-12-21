import { config } from 'src/config';
import { Encrypt } from 'src/utils/Encrypt.util';
import { UserCaseFactory } from '../User/UserFactory.usecase';
import { AuthCase } from './Auth.usecase';

export class AuthCaseFactory {
  public static readonly singleton = AuthCaseFactory.build();

  public static build() {
    return new AuthCase(config.secretKey, UserCaseFactory.singleton, Encrypt);
  }
}
