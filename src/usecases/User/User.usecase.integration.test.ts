import { closeDatabase, cleanDatabase } from 'src/adapters/database/Database.adapter';
import { container } from 'src/adapters/di';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import {
  buildUserFixture,
  expectTohaveUser,
  createUserFixture,
} from 'src/__fixtures__/user.fixture';
import { UserCase } from './User.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('User Case', () => {
  describe('Save', () => {
    it('Should save', async () => {
      const { id: companyId } = await createCompanyFixture();
      const user = buildUserFixture({
        name: 'Nicodemos',
        email: 'mail@mail.com',
        companyId,
      });
      const userId = await container.resolve(UserCase).save(user);

      return expectTohaveUser({ id: userId }, user);
    });

    it('Should reject if email already exists', async () => {
      const { id: companyId } = await createCompanyFixture();
      const email = 'mail@mail.com';
      await createUserFixture({
        name: 'User 1',
        email,
        companyId,
      });

      const promise = createUserFixture({
        name: 'User 2',
        email,
        companyId,
      });

      expect(promise).rejects.toThrow();
    });
  });
});
