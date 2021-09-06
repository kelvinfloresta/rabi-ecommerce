import { TableName } from 'src/adapters/database/Database.adapter';
import { Company } from 'src/entities/Company.entity';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { Id } from '../IGateway';
import { ICompanyGateway } from './ICompany.gateway';

export class CompanyGatewayKnexAdapter implements ICompanyGateway {
  private repository = new KnexRepositoryHelper<Company>(TableName.company);

  async save(input: ISaveCompanyCaseInput): Promise<string> {
    return this.repository.save(input);
  }

  async getById(id: Id): Promise<Company | undefined> {
    return this.repository.getById(id);
  }
}
