import { User } from 'src/entities/User.entity';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { Encrypt } from 'src/adapters/encrypt/Bcrypt.encrypt';
import { container } from 'src/adapters/di';
import { UserCase } from 'src/usecases/User/User.usecase';

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
  const userId = await container.resolve(UserCase).save(user);
  return userId;
}

export async function expectTohaveUser(id: string, expectedUser: Partial<User>): Promise<void> {
  const foundUser = await container.resolve(UserCase).get(id);
  if (!foundUser) {
    throw new Error('User not found');
  }

  if (expectedUser.password) {
    const isValid = new Encrypt().compare(foundUser.password, expectedUser.password);
    expect(isValid).toBe(true);
  }
  expect({ ...foundUser, password: null }).toMatchObject({ ...expectedUser, password: null });
}
