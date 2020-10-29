/* eslint-disable max-classes-per-file */
import { ITimeStamp, ILogicDelete } from './IEntity';
import { DocumentType } from './enums/DocumentType.enum';

export class User implements ITimeStamp, ILogicDelete {
  public readonly id: string;

  public readonly email: string;

  public readonly password: string;

  public readonly companyId: string | null;

  public readonly name: string | null;

  public readonly documentNumber: string | null;

  public readonly documentType: DocumentType | null;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly deletedAt: Date | null;
}
