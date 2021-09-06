import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';

import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import {
  expectTohaveCategory,
  createCategoryFixture,
  buildCategoryFixture,
} from 'src/__fixtures__/category.fixture';
import { uuidv4 } from 'src/utils/uuid.utils';
import { container } from 'src/adapters/di';
import { ISaveCategoryCaseInput } from './ICategory.usecase';
import { CategoryCase } from './Category.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

function makeSut() {
  return container.resolve(CategoryCase);
}

describe('Category Case', () => {
  describe('Save', () => {
    it('Should save category', async () => {
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const category: ISaveCategoryCaseInput = {
        companyId,
        name: 'Minor Prophets',
        description: 'The Twelve Old Testament prophetic Books are known as Minor Prophets.',
      };
      const categoryId = await makeSut().save(category);
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

  describe('List', () => {
    it('Should list categories from company', async () => {
      const { id: companyId } = await createCompanyFixture();
      await createCategoryFixture({ name: 'Category 1', companyId });
      await createCategoryFixture({ name: 'Category 2', companyId });

      const result = await makeSut().list({ companyId });
      expect(result).toHaveLength(2);
    });

    it('Should return an empty array if not found', async () => {
      const companyIdNotExists = uuidv4();
      const result = await makeSut().list({
        companyId: companyIdNotExists,
      });
      expect(result).toHaveLength(0);
    });

    it('Should not return categories from other companies', async () => {
      const { id: companyId } = await createCompanyFixture();
      const { id: anotherCompanyId } = await createCompanyFixture();
      await createCategoryFixture({ companyId });

      const result = await makeSut().list({ companyId: anotherCompanyId });
      expect(result).toHaveLength(0);
    });
  });
});
