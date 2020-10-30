import { Encrypt } from 'src/utils/Encrypt.util';
import { createUserFixture } from 'src/__fixtures__/user.fixture';
import { createCompanyFixture } from 'src/__fixtures__/company.fixture';
import { cleanDatabase } from 'src/adapters/database/Database.adapter';
import { NotAuthorized } from 'src/utils/errors/NotAuthorized.error';
import { AuthCase } from './Auth.usecase';
import { UserCaseFactory } from '../User/UserFactory.usecase';

beforeEach(async () => {
  await cleanDatabase();
});

function makeSut() {
  return new AuthCase('secret', UserCaseFactory.singleton, Encrypt);
}

describe('File: Auth.usecase.ts', () => {
  describe('login', () => {
    it('Should return token if email and password is correct', async () => {
      const { id: companyId } = await createCompanyFixture();
      const email = 'email';
      const password = 'password';
      await createUserFixture({ password, email, companyId });

      const sut = makeSut();
      const token = await sut.login({ email, password });
      expect(token).toBeTruthy();
    });

    it('Should reject if email not exists', async () => {
      const emailNotExists = 'email';
      const anyPassword = 'password';

      const sut = makeSut();
      const promise = sut.login({ email: emailNotExists, password: anyPassword });
      expect(promise).rejects.toThrowError(NotAuthorized);
    });

    it('Should reject if password is wrong', async () => {
      const { id: companyId } = await createCompanyFixture();
      const email = 'email';
      const password = 'password';
      await createUserFixture({ password, email, companyId });

      const wrongPassword = 'wrongPassword';
      const sut = makeSut();
      const promise = sut.login({ email, password: wrongPassword });
      expect(promise).rejects.toThrowError(NotAuthorized);
    });
  });

  describe('authenticate', () => {
    it('Should not reject if token is valid', async () => {
      const { id: companyId } = await createCompanyFixture();
      const email = 'email';
      const password = 'password';
      await createUserFixture({ password, email, companyId });

      const sut = makeSut();
      const token = await sut.login({ email, password });

      const lazyAuthenticate = () => sut.authenticate(token);
      expect(lazyAuthenticate).not.toThrow();
    });

    it('Should reject if token is not valid', async () => {
      const sut = makeSut();
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.9EmJDfAi6fqc_FoO3yD77spdi7QZX-s9VzN89vOaOp0';
      const lazyAuthenticate = () => sut.authenticate(invalidToken);
      expect(lazyAuthenticate).toThrow();
    });
  });
});
