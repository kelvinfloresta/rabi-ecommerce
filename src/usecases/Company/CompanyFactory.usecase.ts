import { CompanyGatewayKnexAdapter } from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-adapter.framework';
import { Company } from 'src/entities/Company.entity';
import { CompanyCase } from './Company.usecase';

export function CompanyCaseFactory() {
  const respository = new KnexRepositoryHelper<Company>(CompanyGatewayKnexAdapter.tableName);
  const gateway = new CompanyGatewayKnexAdapter(respository);
  return new CompanyCase(gateway);
}
