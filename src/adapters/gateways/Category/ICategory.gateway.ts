import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import { Category } from 'src/entities/Category.entity';
import { ISaveGateway, IGetGateway, IListGateway, IDeleteGateway } from '../IGateway';

export interface ICategoryGateway
  extends ISaveGateway<ISaveCategoryCaseInput>,
    IGetGateway<string, Category>,
    IListGateway<IListCategoryCaseInput, Category>,
    IDeleteGateway<IHardDeleteCategoryCaseInput> {}
