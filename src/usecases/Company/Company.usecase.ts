import { Company } from 'src/entities/Company.entity';
import { ICompanyGateway } from 'src/adapters/gateways/Company/ICompany.gateway';
import { ISaveCompanyCaseInput } from './ICompany,usecase';

export class CompanyCase {
  constructor(private companyGateway: ICompanyGateway) {}

  async save(input: ISaveCompanyCaseInput): Promise<string> {
    return this.companyGateway.save(input);
  }

  async get(id: string): Promise<Company | undefined> {
    return this.companyGateway.get(id);
  }
}
