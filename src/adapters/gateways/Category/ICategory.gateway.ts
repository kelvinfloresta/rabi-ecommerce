import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import { Category } from 'src/entities/Category.entity';
import { ICreateGateway, IGetByIdGateway, IListByFilterGateway, IDeleteGateway } from '../IGateway';

export interface ICategoryGateway
  extends ICreateGateway<ISaveCategoryCaseInput>,
    IGetByIdGateway<Category>,
    IListByFilterGateway<IListCategoryCaseInput, Category>,
    IDeleteGateway<IHardDeleteCategoryCaseInput> {}
