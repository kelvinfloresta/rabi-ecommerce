import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import { Category } from 'src/entities/Category.entity';
import { ISaveGateway, IGetByIdGateway, IListByFilterGateway, IDeleteGateway } from '../IGateway';

export interface ICategoryGateway
  extends ISaveGateway<ISaveCategoryCaseInput>,
    IGetByIdGateway<Category>,
    IListByFilterGateway<IListCategoryCaseInput, Category>,
    IDeleteGateway<IHardDeleteCategoryCaseInput> {}
