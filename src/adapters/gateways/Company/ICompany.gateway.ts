import { Company } from 'src/entities/Company.entity';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { ICreateGateway, IGetByIdGateway } from '../IGateway';

export interface ICompanyGateway
  extends ICreateGateway<ISaveCompanyCaseInput>,
    IGetByIdGateway<Company> {}
