import { TableName } from 'src/adapters/database/Database.adapter';
import { Company } from 'src/entities/Company.entity';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { ICompanyGateway } from './ICompany.gateway';

export class CompanyGatewayKnexAdapter extends KnexRepositoryHelper<Company>
  implements ICompanyGateway {
  constructor() {
    super(TableName.company);
  }
}
