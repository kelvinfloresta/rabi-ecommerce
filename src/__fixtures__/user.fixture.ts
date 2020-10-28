import User from 'src/entities/User.entity';
import UserCaseFactory from 'src/usecases/User/UserFactory.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import DocumentType from 'src/entities/enums/DocumentType.enum';
import Encrypt from 'src/utils/Encrypt.util';

type IPartialSaveUserCase = Partial<ISaveUserCaseInput> & { companyId: string };

export function buildUserFixture(params: IPartialSaveUserCase): ISaveUserCaseInput {
  const user = {
    name: params.name || 'Rabi',
    documentType: params.documentType || DocumentType.CPF,
    documentNumber: params.documentNumber || '39990784051',
    email: params.email || 'rabi@rabi.com',
    companyId: params.companyId,
    password: params.password || 'my secret password',
  };
  return user;
}

export async function createUserFixture(params: IPartialSaveUserCase): Promise<string> {
  const user = buildUserFixture(params);
  const userId = await UserCaseFactory.singleton.save(user);
  return userId;
}

export async function expectTohaveUser(id: string, expectedUser: Partial<User>): Promise<void> {
  const foundUser = await UserCaseFactory.singleton.get(id);
  if (!foundUser) {
    throw new Error('User not found');
  }
  if (expectedUser.password) {
    const isValid = Encrypt.compare(foundUser.password, expectedUser.password);
    expect(isValid).toBe(true);
  }
  expect({ ...foundUser, password: null }).toMatchObject({ ...expectedUser, password: null });
}
