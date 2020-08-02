import { ITimeStamp, ILogicDelete } from 'src/entities/IEntity';
import User from 'src/entities/User.entity';

export interface ISaveUserCaseInput
  extends Omit<User, 'id' | keyof ITimeStamp | keyof ILogicDelete> {}
