import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';
import { expectTohaveCompany } from 'src/__fixtures__/company.fixture';
import { uuidv4 } from 'src/utils/uuid.utils';

import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { container } from 'src/adapters/di';
import { ISaveCompanyCaseInput } from './ICompany,usecase';
import { CompanyCase } from './Company.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

function makeSut() {
  return container.resolve(CompanyCase);
}

describe('company Case', () => {
  describe('Save', () => {
    it('Should return the saved company', async () => {
      const sut = makeSut();
      const myCompany: ISaveCompanyCaseInput = {
        name: 'My super ecommerce',
        documentNumber: '30 Eggs for 10$',
        documentType: DocumentType.CPF,
      };
      const companyId = await sut.save(myCompany);
      return expectTohaveCompany(companyId, myCompany);
    });
  });

  describe('get', () => {
    it.todo('Should return all fields');

    it('Should return undefined if not found', async () => {
      const sut = makeSut();
      const NOT_EXISTENT_ID = { id: uuidv4() };
      const companyFound = await sut.getById(NOT_EXISTENT_ID);
      expect(companyFound).toBeUndefined();
    });
  });
});
