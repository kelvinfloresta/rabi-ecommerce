import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';
import { createProductFixture } from 'src/__fixtures__/product.fixture';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import { createUserFixture } from 'src/__fixtures__/user.fixture';
import { CartCaseFactory } from './CartFactory.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Cart Case', () => {
  describe('ChangeQuantity', () => {
    it('Should create cart item if not exists', async () => {
      const { id: companyId } = await createCompanyFixture();
      const { id: productId } = await createProductFixture({ companyId });
      const userId = await createUserFixture({ companyId });
      const quantity = 1;

      await CartCaseFactory.singleton.add({
        quantity,
        productId,
        userId,
      });

      const cartItem = await CartCaseFactory.singleton.get({ productId, userId });
      expect(cartItem?.quantity).toBe(quantity);
    });

    it('Should increment when cart item already exists', async () => {
      const { id: companyId } = await createCompanyFixture();
      const { id: productId } = await createProductFixture({ companyId });
      const userId = await createUserFixture({ companyId });

      await CartCaseFactory.singleton.add({
        productId,
        userId,
        quantity: 1,
      });

      await CartCaseFactory.singleton.add({
        productId,
        userId,
        quantity: 1,
      });

      const cartItem = await CartCaseFactory.singleton.get({ productId, userId });
      expect(cartItem?.quantity).toBe(2);
    });
  });
});
