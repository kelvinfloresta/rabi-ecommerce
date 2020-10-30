import { closeDatabase, truncateTable } from 'src/adapters/database/Database.adapter';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import {
  buildUserFixture,
  expectTohaveUser,
  createUserFixture,
} from 'src/__fixtures__/user.fixture';
import { UserGatewayKnexAdapter } from 'src/adapters/gateways/User/UserKnexAdapter.gateway';
import { CompanyGatewayKnexAdapter } from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { UserCaseFactory } from './UserFactory.usecase';

beforeEach(async () => {
  await truncateTable(UserGatewayKnexAdapter.tableName);
  await truncateTable(CompanyGatewayKnexAdapter.tableName);
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
      const userId = await UserCaseFactory.singleton.save(user);

      return expectTohaveUser(userId, user);
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
