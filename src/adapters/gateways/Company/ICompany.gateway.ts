import Company from 'src/entities/Company.entity';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { ISaveGateway, IGetGateway } from '../IGateway';

export default interface ICompanyGateway
  extends ISaveGateway<ISaveCompanyCaseInput>,
    IGetGateway<string, Company> {}
