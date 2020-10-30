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
      const page = await sut.paginate({ companyId: firstCompany }, { currentPage: 1, perPage: 10 });

      expect(page.data.length).toBe(1);
      expect(page.data[0]).toMatchObject(expectedProduct);
    });
  });

  describe('patch', () => {
    it('Should patch name', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'cake', companyId });
      const newName = 'cupcake';
      await sut.patch({ name: newName, id: product.id });
      const result = await sut.get(product.id);
      expect(result?.name).toBe(newName);
    });

    it('Should patch description', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ price: 10, companyId });
      const newDescription = 'A lovely product';
      await sut.patch({ description: newDescription, id: product.id });
      const result = await sut.get(product.id);
      expect(result?.description).toBe(newDescription);
    });

    it('Should patch price', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ price: 10, companyId });
      const newPrice = 10.99;
      await sut.patch({ price: newPrice, id: product.id });
      const result = await sut.get(product.id);
      expect(result?.price).toBe(newPrice);
    });

    it('Should patch disabled', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ disabled: true, companyId });
      await sut.patch({ disabled: false, id: product.id });
      const result = await sut.get(product.id);
      expect(result?.disabled).toBeFalsy();
    });

    it('Should not patch the other product values', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'banana', price: 1, companyId });
      await sut.patch({ id: product.id, name: 'A rare banana', price: 999 });
      const result = await sut.get(product.id);
      const fieldsNotChanged = { description: product.description, disabled: product.disabled };
      const fieldsNotpatchd = { description: result?.description, disabled: result?.disabled };
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
    it('Should be logical delete', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const { id } = await createProductFixture({ name: 'cake', companyId });
      await sut.delete(id);
      const deletedProduct = await sut.get(id);
      expect(deletedProduct?.deletedAt).toBeInstanceOf(Date);
    });

    it('Should return false if not found', async () => {
      const sut = ProductCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const deleted = await sut.delete(NOT_EXISTENT_ID);
      expect(deleted).toBeFalsy();
    });

    it('Should return true if deleted', async () => {
      const sut = ProductCaseFactory();
      const { id: companyId } = await createCompanyFixture({ name: 'My great company' });
      const product = await createProductFixture({ name: 'cake', companyId });
      const deleted = await sut.delete(product.id);
      expect(deleted).toBeTruthy();
    });
  });
});
