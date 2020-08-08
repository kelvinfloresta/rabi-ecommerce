import { closeDatabase, truncateTable } from 'src/adapters/database/Database.adapter';

import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import CategoryGatewayKnexAdapter from 'src/adapters/gateways/Category/CategoryKnexAdapter.gateway';
import CompanyGatewayKnexAdapter from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import {
  expectTohaveCategory,
  createCategoryFixture,
  buildCategoryFixture,
} from 'src/__fixtures__/category.fixture';
import CategoryCaseFactory from './CategoryFactory.usecase';
import { ISaveCategoryCaseInput } from './ICategory.usecase';

beforeEach(async () => {
  await truncateTable(CategoryGatewayKnexAdapter.tableName);
  await truncateTable(CompanyGatewayKnexAdapter.tableName);
});

afterAll(async () => {
  await closeDatabase();
});

describe('Category Case', () => {
  describe('Save', () => {
    it('Should save category', async () => {
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const category: ISaveCategoryCaseInput = {
        companyId,
        name: 'Minor Prophets',
        description: 'The Twelve Old Testament prophetic Books are known as Minor Prophets.',
      };
      const categoryId = await CategoryCaseFactory.singleton.save(category);
      return expectTohaveCategory(categoryId, category);
    });

    it('Should reject if name already exists in company', async () => {
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const sameName = 'same category name';
      await createCategoryFixture({ companyId, name: sameName });
      expect(createCategoryFixture({ companyId, name: sameName })).rejects.toThrow();
    });

    it('Should not reject if name already exists in another company', async () => {
      const { id: companyId1 } = await createCompanyFixture({ name: 'Company 1' });
      const { id: companyId2 } = await createCompanyFixture({ name: 'Company 2' });
      const sameName = 'same category name';
      buildCategoryFixture({ name: sameName, companyId: companyId1 });
      await createCategoryFixture({ companyId: companyId1, name: sameName });
      expect(
        createCategoryFixture({ companyId: companyId2, name: sameName })
      ).resolves.toBeTruthy();
    });
  });
});
