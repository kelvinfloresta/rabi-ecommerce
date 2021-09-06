import { Company } from 'src/entities/Company.entity';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { ISaveGateway, IGetByIdGateway } from '../IGateway';

export interface ICompanyGateway
  extends ISaveGateway<ISaveCompanyCaseInput>,
    IGetByIdGateway<Company> {}
