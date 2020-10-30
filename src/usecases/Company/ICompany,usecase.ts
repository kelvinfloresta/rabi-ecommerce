import { ITimeStamp } from 'src/entities/IEntity';
import { Company } from 'src/entities/Company.entity';

export interface ISaveCompanyCaseInput extends Omit<Company, 'id' | keyof ITimeStamp> {}
