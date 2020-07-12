import { closeDatabase } from 'src/adapters/database/Database.adapter';
import { createCompanyFixture, buildCompanyFixture } from 'src/__fixtures__/company.fixture';
import { uuidv4 } from 'src/__fixtures__/utils/uuid.fixture';

import CompanyCaseFactory from './CompanyFactory.usecase';

afterAll(async () => {
  await closeDatabase();
});

describe('company Case', () => {
  describe('Save', () => {
    it('Should return the saved company', async () => {
      const company = buildCompanyFixture({ name: '30 Eggs for 10$' });
      const sut = CompanyCaseFactory();
      const result = await sut.save(company);
      expect(result).toMatchObject(company);
    });
  });

  describe('get', () => {
    it('Should return all fields', async () => {
      const sut = CompanyCaseFactory();
      const company = await createCompanyFixture({ name: 'My super ecommerce' });
      const companyFound = await sut.get(company.id);
      expect(companyFound).toMatchObject(company);
    });

    it('Should return undefined if not found', async () => {
      const sut = CompanyCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const companyFound = await sut.get(NOT_EXISTENT_ID);
      expect(companyFound).toBeUndefined();
    });
  });
});
