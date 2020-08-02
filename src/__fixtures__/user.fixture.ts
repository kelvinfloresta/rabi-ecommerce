import User from 'src/entities/User.entity';
import UserCaseFactory from 'src/usecases/User/UserFactory.usecase';
import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import DocumentType from 'src/entities/enums/DocumentType.enum';

type IPartialSaveUserCase = Partial<ISaveUserCaseInput> & { companyId: string };

export function buildUserFixture(params: IPartialSaveUserCase): ISaveUserCaseInput {
  const user = {
    name: params.name || 'Rabi',
    documentType: params.documentType || DocumentType.CPF,
    documentNumber: params.documentNumber || '39990784051',
    email: params.email || 'rabi@rabi.com',
    companyId: params.companyId,
  };
  return user;
}

export async function createUserFixture(params: IPartialSaveUserCase): Promise<string> {
  const user = buildUserFixture(params);
  const userId = await UserCaseFactory.singleton.save(user);
  return userId;
}

export async function expectTohaveUser(id: string, user: Partial<User>) {
  const result = await UserCaseFactory.singleton.get(id);
  return expect(result).toMatchObject(user);
}
