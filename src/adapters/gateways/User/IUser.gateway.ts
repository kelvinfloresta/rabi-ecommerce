import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { User } from 'src/entities/User.entity';
import { ISaveGateway, IGetByIdGateway } from '../IGateway';

export interface IUserGateway extends ISaveGateway<ISaveUserCaseInput>, IGetByIdGateway<User> {
  getByFilter(filter: Partial<User>): Promise<User | undefined>;
}
