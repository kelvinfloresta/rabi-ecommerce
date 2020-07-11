import Company from 'src/entities/Company.entity';
import { uuidv4 } from 'src/__fixtures__/utils/uuid.fixture';
import CompanyCase from 'src/usecases/Company/Company.usecase';
import DocumentType from 'src/entities/enums/DocumentType.enum';

export function buildCompanyFixture(params: Partial<Company>): Company {
  const company:Company = {
    id: params.id || uuidv4(),
    name: params.name || 'The amazing Company',
    documentNumber: '14066245781',
    documentType: DocumentType.CPF,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return company;
}

export async function createCompanyFixture(
  params: Partial<Company>,
  companyCase: CompanyCase,
): Promise<Company> {
  const company = buildCompanyFixture(params);
  return companyCase.save(company);
}
