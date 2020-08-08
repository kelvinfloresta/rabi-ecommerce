export interface ISaveUserCaseInput {
  readonly email: string;
  readonly password: string;
  readonly companyId?: string | null;
  readonly name?: string | null;
  readonly documentNumber?: string | null;
  readonly documentType?: DocumentType | null;
}
