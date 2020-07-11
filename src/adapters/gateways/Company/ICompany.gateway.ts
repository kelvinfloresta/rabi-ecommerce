import Company from 'src/entities/Company.entity';
import { ISaveGateway, IGetGateway } from '../IGateway';

export default interface ICompanyGateway extends ISaveGateway<Company>, IGetGateway<Company> {}
