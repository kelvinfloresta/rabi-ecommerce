import { ITimeStamp } from './IEntity';
import DocumentType from './enums/DocumentType.enum';

export default class Company implements ITimeStamp {
  public id: string;

  public name: string;

  public documentNumber: string;

  public documentType: DocumentType;

  public createdAt: Date;

  public updatedAt: Date;
}
