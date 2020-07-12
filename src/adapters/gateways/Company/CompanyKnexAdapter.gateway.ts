import Company from 'src/entities/Company.entity';
import KnexBaseGateway from 'src/frameworks/database/knex/knex-adapter.framework';
import ICompanyGateway from './ICompany.gateway';

export default class CompanyGatewayKnexAdapter extends KnexBaseGateway<Company>
  implements ICompanyGateway {
  public tableName = 'companies';

  public static tableName = 'companies';
}
