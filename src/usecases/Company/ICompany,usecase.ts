import { DocumentType } from 'src/entities/enums/DocumentType.enum';

export interface ISaveCompanyCaseInput {
  readonly name: string;
  readonly documentNumber: string | null;
  readonly documentType: DocumentType | null;
}
