import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { User } from 'src/entities/User.entity';
import { ICreateGateway, IGetByIdGateway } from '../IGateway';

export interface IUserGateway extends ICreateGateway<ISaveUserCaseInput>, IGetByIdGateway<User> {
  getByFilter(filter: Partial<User>): Promise<User | undefined>;
}
