import { container } from 'tsyringe';
import { UserGatewayKnexAdapter } from '../gateways/User/UserKnexAdapter.gateway';
import { TYPES } from './types';

export function register() {
  container.register(TYPES.UserGateway, {
    useClass: UserGatewayKnexAdapter,
  });
}
