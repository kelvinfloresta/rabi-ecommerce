import Company from 'src/entities/Company.entity';
import DocumentType from 'src/entities/enums/DocumentType.enum';
import CompanyCaseFactory from 'src/usecases/Company/CompanyFactory.usecase';
import { ISaveCompanyCaseInput } from 'src/usecases/Company/ICompany,usecase';

export function buildCompanyFixture(
  params?: Partial<ISaveCompanyCaseInput>
): ISaveCompanyCaseInput {
  const company = {
    name: params?.name || 'The amazing Company',
    documentNumber: params?.documentNumber || '54813491081',
    documentType: params?.documentType || DocumentType.CPF,
  };

  return company;
}

export async function createCompanyFixture(params?: Partial<Company>): Promise<Company> {
  const companyCase = CompanyCaseFactory();
  const company = buildCompanyFixture(params);
  const companyId = await companyCase.save(company);
  return companyCase.get(companyId);
}

export async function expectTohaveCompany(id: string, product: Partial<Company>) {
  const companyCase = CompanyCaseFactory();
  const result = await companyCase.get(id);
  return expect(result).toMatchObject(product);
}
