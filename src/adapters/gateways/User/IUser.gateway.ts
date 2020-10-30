import { ISaveUserCaseInput } from 'src/usecases/User/IUser.usecase';
import { User } from 'src/entities/User.entity';
import { ISaveGateway, IGetGateway } from '../IGateway';

export interface IUserGateway extends ISaveGateway<ISaveUserCaseInput>, IGetGateway<string, User> {
  getByFilter(filter: Partial<User>): Promise<User | undefined>;
}
