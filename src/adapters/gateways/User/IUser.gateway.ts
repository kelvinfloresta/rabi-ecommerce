import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { ICreateGateway, IGetByIdGateway } from '../IGateway';

export interface IUserGateway
  extends ICreateGateway<ISaveUserCaseInput>,
    IGetByIdGateway<UserBusinessData> {
  getByFilter(filter: Partial<UserBusinessData>): Promise<UserBusinessData | undefined>;
}

export interface UserBusinessData {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly companyId: string | null;
  readonly name: string | null;
  readonly documentNumber: string | null;
  readonly documentType: DocumentType | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
