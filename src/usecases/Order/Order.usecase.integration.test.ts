import { cleanDatabase, closeDatabase } from 'src/adapters/database/Database.adapter';
import { container } from 'src/adapters/di';
import { NotFound } from 'src/errors/NotFound.error';
import { OrderCase } from 'src/usecases/Order/Order.usecase';
import { uuidv4 } from 'src/utils/uuid.utils';
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

    it('Should reject if product not found', async () => {
      const { id: companyId } = await createCompanyFixture();
      const userId = await createUserFixture({ companyId });

      const NON_EXISTING_ID = uuidv4();
      const sut = container.resolve(OrderCase);
      const promise = sut.create({
        companyId,
        userId,
        items: [{ productId: NON_EXISTING_ID, quantity: 1 }],
      });

      await expect(promise).rejects.toThrow(
        new NotFound({ id: NON_EXISTING_ID, resource: 'Product' })
      );
    });
  });
});
