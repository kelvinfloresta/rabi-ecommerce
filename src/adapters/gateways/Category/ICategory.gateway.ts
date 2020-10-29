import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import Category from 'src/entities/Category.entity';
import { ISaveGateway, IGetGateway, IListGateway } from '../IGateway';

export interface ICategoryGateway
  extends ISaveGateway<ISaveCategoryCaseInput>,
    IGetGateway<string, Category>,
    IListGateway<IListCategoryCaseInput, Category> {}
