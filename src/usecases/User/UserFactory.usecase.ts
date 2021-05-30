import { UserGatewayKnexAdapter } from 'src/adapters/gateways/User/UserKnexAdapter.gateway';
import { Encrypt } from 'src/utils/Encrypt.util';
import { UserCase } from './User.usecase';

export class UserCaseFactory {
  public static readonly singleton = UserCaseFactory.build();

  public static build() {
    const UserGateway = new UserGatewayKnexAdapter();
    return new UserCase(UserGateway, Encrypt);
  }
}
