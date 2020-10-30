import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';
import { expectTohaveCompany } from 'src/__fixtures__/company.fixture';
import { uuidv4 } from 'src/utils/uuid.utils';

import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { CompanyCaseFactory } from './CompanyFactory.usecase';
import { ISaveCompanyCaseInput } from './ICompany,usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('company Case', () => {
  describe('Save', () => {
    it('Should return the saved company', async () => {
      const sut = CompanyCaseFactory();
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
      const sut = CompanyCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const companyFound = await sut.get(NOT_EXISTENT_ID);
      expect(companyFound).toBeUndefined();
    });
  });
});
