import Company from 'src/entities/Company.entity';
import KnexBaseGateway from 'src/frameworks/database/knex/knex-adapter.framework';
import ICompanyGateway from './ICompany.gateway';

export default class CompanyGatewayKnexAdapter extends KnexBaseGateway implements ICompanyGateway {
  public tableName = 'companies';

  public static tableName = 'companies';

  get = KnexBaseGateway.makeGet<Company>();

  save = KnexBaseGateway.makeSave<Company>('*');
}
