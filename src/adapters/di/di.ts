import { container } from 'tsyringe';
import { CategoryGatewayKnexAdapter } from '../gateways/Category/CategoryKnexAdapter.gateway';
import { CompanyGatewayKnexAdapter } from '../gateways/Company/CompanyKnexAdapter.gateway';
import { UserGatewayKnexAdapter } from '../gateways/User/UserKnexAdapter.gateway';
import { TYPES } from './types';

export function register() {
  container.register(TYPES.UserGateway, {
    useClass: UserGatewayKnexAdapter,
  });

  container.register(TYPES.CompanyGateway, {
    useClass: CompanyGatewayKnexAdapter,
  });

  container.register(TYPES.CategoryGateway, {
    useClass: CategoryGatewayKnexAdapter,
  });
}
