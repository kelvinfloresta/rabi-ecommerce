import { container } from 'src/adapters/di';
import { Company } from 'src/entities/Company.entity';
import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { CompanyCase } from 'src/usecases/Company/Company.usecase';
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
  const company = buildCompanyFixture(params);
  const companyCase = container.resolve(CompanyCase);
  const companyId = await companyCase.save(company);
  const companyCreated = await companyCase.getById({ id: companyId });
  if (!companyCreated) {
    throw new Error('Failed on createCompanyFixture');
  }
  return companyCreated;
}

export async function expectTohaveCompany(id: string, product: Partial<Company>) {
  const companyCase = container.resolve(CompanyCase);
  const result = await companyCase.getById({ id });
  return expect(result).toMatchObject(product);
}
