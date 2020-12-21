import { ITimeStamp } from './IEntity';
import { DocumentType } from './enums/DocumentType.enum';

export class Company implements ITimeStamp {
  public id: string;

  public name: string;

  public documentNumber: string | null;

  public documentType: DocumentType | null;

  public createdAt: Date;

  public updatedAt: Date;
}
