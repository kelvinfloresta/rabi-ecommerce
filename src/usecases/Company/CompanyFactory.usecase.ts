import { CompanyGatewayKnexAdapter } from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { Company } from 'src/entities/Company.entity';
import { TableName } from 'src/adapters/database/Database.adapter';
import { CompanyCase } from './Company.usecase';

export function CompanyCaseFactory() {
  const respository = new KnexRepositoryHelper<Company>(TableName.company);
  const gateway = new CompanyGatewayKnexAdapter(respository);
  return new CompanyCase(gateway);
}
