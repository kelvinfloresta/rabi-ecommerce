import { Company } from 'src/entities/Company.entity';
import { ICompanyGateway } from 'src/adapters/gateways/Company/ICompany.gateway';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import { ISaveCompanyCaseInput } from './ICompany,usecase';

@injectable()
export class CompanyCase {
  constructor(@inject(TYPES.CompanyGateway) private companyGateway: ICompanyGateway) {}

  async save(input: ISaveCompanyCaseInput): Promise<string> {
    return this.companyGateway.save(input);
  }

  async get(id: string): Promise<Company | undefined> {
    return this.companyGateway.get(id);
  }
}
