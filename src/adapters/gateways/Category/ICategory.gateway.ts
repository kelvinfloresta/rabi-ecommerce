import { ISaveCategoryCaseInput } from 'src/usecases/Category/ICategory.usecase';
import Category from 'src/entities/Category.entity';
import { ISaveGateway, IGetGateway } from '../IGateway';

export default interface ICategoryGateway
  extends ISaveGateway<ISaveCategoryCaseInput>,
    IGetGateway<string, Category> {}
