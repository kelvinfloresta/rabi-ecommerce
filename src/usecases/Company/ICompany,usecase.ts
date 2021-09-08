import { CompanyBusinessData } from 'src/adapters/gateways/Company/ICompany.gateway';
import { ITimeStamp } from 'src/entities/IEntity';

export interface ISaveCompanyCaseInput extends Omit<CompanyBusinessData, 'id' | keyof ITimeStamp> {}
