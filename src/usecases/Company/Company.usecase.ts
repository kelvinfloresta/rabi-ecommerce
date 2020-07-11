import ICompanyGateway from 'src/adapters/gateways/Company/ICompany.gateway';
import Company from 'src/entities/Company.entity';

export default class CompanyCase {
  constructor(private companyGateway: ICompanyGateway) {}

  async save(input: Company): Promise<Company> {
    return this.companyGateway.save(input);
  }

  async get(id: string): Promise<Company> {
    return this.companyGateway.get(id);
  }
}
