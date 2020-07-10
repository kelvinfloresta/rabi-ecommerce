import { closeDatabase } from 'src/adapters/database/Database.adapter';
import { buildProductFixture, createProductFixture } from 'src/__fixtures__/product.fixture';
import { uuidv4 } from 'src/__fixtures__/utils/uuid.fixture';
import ProductCaseFactory from './ProductFactory.usecase';

afterAll(async () => {
  await closeDatabase();
});

describe('Product Case', () => {
  describe('Save', () => {
    it('Should return the saved product', async () => {
      const product = buildProductFixture({ name: 'cake' });
      const sut = ProductCaseFactory();
      const result = await sut.save(product);
      expect(result).toMatchObject(product);
    });
  });

  describe('patch', () => {
    it('Should patch name', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ name: 'cake' }, sut);
      const newName = 'cupcake';
      const result = await sut.patch(product.id, { name: newName });
      expect(result.name).toBe(newName);
    });

    it('Should patch description', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ price: 10 }, sut);
      const newDescription = 'A lovely product';
      const result = await sut.patch(product.id, { description: newDescription });
      expect(result.description).toBe(newDescription);
    });

    it('Should patch price', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ price: 10 }, sut);
      const newPrice = 10.99;
      const result = await sut.patch(product.id, { price: newPrice });
      expect(result.price).toBe(newPrice);
    });

    it('Should patch disabled', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ disabled: true }, sut);
      const result = await sut.patch(product.id, { disabled: false });
      expect(result.disabled).toBeFalsy();
    });

    it('Should not patch the other product values', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ name: 'banana', price: 1 }, sut);
      const result = await sut.patch(product.id, { name: 'A rare banana', price: 999 });
      const fieldsNotChanged = { description: product.description, disabled: product.disabled };
      const fieldsNotpatchd = { description: result.description, disabled: result.disabled };
      expect(fieldsNotChanged).toMatchObject(fieldsNotpatchd);
    });
  });

  describe('get', () => {
    it('Should return all fields', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ name: 'cake' }, sut);
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
    it('Should return false if not found', async () => {
      const sut = ProductCaseFactory();
      const NOT_EXISTENT_ID = uuidv4();
      const deleted = await sut.delete(NOT_EXISTENT_ID);
      expect(deleted).toBeFalsy();
    });

    it('Should return true if deleted', async () => {
      const sut = ProductCaseFactory();
      const product = await createProductFixture({ name: 'cake' }, sut);
      const deleted = await sut.delete(product.id);
      expect(deleted).toBeTruthy();
    });
  });
});
