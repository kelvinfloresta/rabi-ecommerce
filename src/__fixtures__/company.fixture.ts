import Company from 'src/entities/Company.entity';
import { uuidv4 } from 'src/__fixtures__/utils/uuid.fixture';
import DocumentType from 'src/entities/enums/DocumentType.enum';
import CompanyCaseFactory from 'src/usecases/Company/CompanyFactory.usecase';

export function buildCompanyFixture(params?: Partial<Company>): Company {
  const company: Company = {
    id: params?.id || uuidv4(),
    name: params?.name || 'The amazing Company',
    documentNumber: params?.documentNumber || '54813491081',
    documentType: params?.documentType || DocumentType.CPF,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return company;
}

export async function createCompanyFixture(params: Partial<Company>): Promise<Company> {
  const companyCase = CompanyCaseFactory();
  const company = buildCompanyFixture(params);
  return companyCase.save(company);
}
