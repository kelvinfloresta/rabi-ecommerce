import { TableName } from 'src/adapters/database/Database.adapter';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { CompanyBusinessData, ICompanyGateway } from './ICompany.gateway';

export class CompanyGatewayKnexAdapter extends KnexRepositoryHelper<CompanyBusinessData>
  implements ICompanyGateway {
  constructor() {
    super(TableName.company);
  }
}
