import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';
import { ICreateGateway, IGetByIdGateway, ITimeStamp } from '../IGateway';

export interface ICompanyGateway
  extends ICreateGateway<ISaveCompanyCaseInput>,
    IGetByIdGateway<CompanyBusinessData> {}

export interface CompanyBusinessData extends ITimeStamp {
  readonly id: string;
  readonly name: string;
  readonly documentNumber: string | null;
  readonly documentType: DocumentType | null;
}
