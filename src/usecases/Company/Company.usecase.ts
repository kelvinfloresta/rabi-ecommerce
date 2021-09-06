import { Company } from 'src/entities/Company.entity';
import { ICompanyGateway } from 'src/adapters/gateways/Company/ICompany.gateway';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import { Id } from 'src/adapters/gateways/IGateway';
import { ISaveCompanyCaseInput } from './ICompany,usecase';

@injectable()
export class CompanyCase {
  constructor(@inject(TYPES.CompanyGateway) private companyGateway: ICompanyGateway) {}

  async save(input: ISaveCompanyCaseInput): Promise<string> {
    return this.companyGateway.create(input);
  }

  async getById(id: Id): Promise<Company | undefined> {
    return this.companyGateway.getById(id);
  }
}
