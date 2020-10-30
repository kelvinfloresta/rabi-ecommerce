import { Company } from 'src/entities/Company.entity';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { ICompanyGateway } from './ICompany.gateway';

export class CompanyGatewayKnexAdapter implements ICompanyGateway {
  constructor(private repository: KnexRepositoryHelper<Company>) {}

  async save(input: ISaveCompanyCaseInput): Promise<string> {
    return this.repository.save(input);
  }

  async get(id: string): Promise<Company> {
    return this.repository.getById(id);
  }
}
