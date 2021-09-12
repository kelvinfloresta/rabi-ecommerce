import { cleanDatabase, closeDatabase } from 'src/adapters/database/Database.adapter';
import { container } from 'src/adapters/di';
import { OrderCase } from 'src/usecases/Order/Order.usecase';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import { createProductFixture } from 'src/__fixtures__/product.fixture';
import { createUserFixture } from 'src/__fixtures__/user.fixture';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('File: Order.usecase.ts', () => {
  describe('create', () => {
    it('Should create items correctly', async () => {
      const { id: companyId } = await createCompanyFixture();
      const userId = await createUserFixture({ companyId });
      const { id: productId, price } = await createProductFixture({ companyId });

      const sut = container.resolve(OrderCase);
      await sut.create({
        companyId,
        userId,
        items: [{ productId, quantity: 1 }],
      });

      const [{ items }] = await sut.list({ companyId });
      const expectedItems = {
        productId,
        price,
        quantity: 1,
      };

      expect(items[0]).toMatchObject(expectedItems);
    });
  });
});
