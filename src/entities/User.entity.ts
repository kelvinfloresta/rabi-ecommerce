import { ITimeStamp, ILogicDelete } from './IEntity';
import DocumentType from './enums/DocumentType.enum';

export default class User implements ITimeStamp, ILogicDelete {
  public readonly id: string;

  public readonly companyId: string;

  public readonly name: string;

  public readonly email: string;

  public readonly documentNumber: string;

  public readonly documentType: DocumentType;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly deletedAt: Date | null;
}
