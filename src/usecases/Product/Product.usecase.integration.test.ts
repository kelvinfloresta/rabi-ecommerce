import { closeDatabase } from 'src/adapters/database/Database.adapter';
import { buildProductFixture } from 'src/__fixtures__/product.fixture';
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
});
