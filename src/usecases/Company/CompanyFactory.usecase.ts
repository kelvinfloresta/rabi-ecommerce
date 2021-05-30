import { CompanyGatewayKnexAdapter } from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { CompanyCase } from './Company.usecase';

export function CompanyCaseFactory() {
  const gateway = new CompanyGatewayKnexAdapter();
  return new CompanyCase(gateway);
}
