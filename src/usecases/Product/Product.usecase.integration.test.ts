import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';
import {
  buildProductFixture,
  createProductFixture,
  expectTohaveProduct,
} from 'src/__fixtures__/product.fixture';
import { uuidv4 } from 'src/utils/uuid.utils';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import { ProductCaseFactory } from './ProductFactory.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Product Case', () => {
  describe('Save', () => {
    it('Should return the saved product', async () => {
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = buildProductFixture({ name: 'cake', companyId });
      const sut = ProductCaseFactory();
      const productId = await sut.save(product);
      return expectTohaveProduct(productId, product);
    });
  });

  describe('Paginate', () => {
    it('Should not return products of other companies', async () => {
      const { id: firstCompany } = await createCompanyFixture({ name: 'My great company' });
      const { id: secondCompany } = await createCompanyFixture({ name: 'Another great company' });
      const expectedProduct = buildProductFixture({ name: 'green apple', companyId: firstCompany });
      await createProductFixture(expectedProduct);
      await createProductFixture({ name: 'banana', companyId: secondCompany });

      const sut = ProductCaseFactory();
      const result = await sut.list({ companyId: firstCompany });

      expect(result.length).toBe(1);
      expect(result[0]).toMatchObject(expectedProduct);
    });
  });

  describe('patch', () => {
    it('Should patch name', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'cake', companyId });
      const newName = 'cupcake';
      await sut.patchByFilter({ id: product.id, companyId }, { name: newName });
      const result = await sut.get(product.id);
      expect(result?.name).toBe(newName);
    });

    it('Should patch description', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ price: 10, companyId });
      const newDescription = 'A lovely product';
      await sut.patchByFilter({ id: product.id, companyId }, { description: newDescription });
      const result = await sut.get(product.id);
      expect(result?.description).toBe(newDescription);
    });

    it('Should patch price', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ price: 10, companyId });
      const newPrice = 10.99;
      await sut.patchByFilter({ id: product.id, companyId }, { price: newPrice });
      const result = await sut.get(product.id);
      expect(result?.price).toBe(newPrice);
    });

    it('Should patch active', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ active: true, companyId });
      await sut.patchByFilter({ id: product.id, companyId }, { active: false });
      const result = await sut.get(product.id);
      expect(result?.active).toBeFalsy();
    });

    it('Should not patch the other product values', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'banana', price: 1, companyId });
      await sut.patchByFilter({ id: product.id, companyId }, { name: 'A rare banana', price: 999 });
      const result = await sut.get(product.id);
      const fieldsNotChanged = { description: product.description, active: product.active };
      const fieldsNotpatchd = { description: result?.description, active: result?.active };
      expect(fieldsNotChanged).toMatchObject(fieldsNotpatchd);
    });
  });

  describe('get', () => {
    it('Should return all fields', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'cake', companyId });
      const productFound = await sut.get(product.id);
      expect(productFound).toMatchObject(product);
    });

    it('Should return undefined if not found', async () => {
      const sut = ProductCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const productFound = await sut.get(NOT_EXISTENT_ID);
      expect(productFound).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('Should delete', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const { id } = await createProductFixture({ name: 'cake', companyId });
      await sut.delete({ id, companyId });
      const deletedProduct = await sut.get(id);
      expect(deletedProduct).toBeUndefined();
    });

    it('Should return false if not found', async () => {
      const sut = ProductCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const deleted = await sut.delete({ id: NOT_EXISTENT_ID, companyId: NOT_EXISTENT_ID });
      expect(deleted).toBe(false);
    });

    it('Should return true if deleted', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'cake', companyId });
      const deleted = await sut.delete({ companyId, id: product.id });
      expect(deleted).toBe(true);
    });
  });
});
