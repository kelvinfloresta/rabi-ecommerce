import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from 'src/usecases/Category/ICategory.usecase';
import { ICreateGateway, IGetByIdGateway, IListByFilterGateway, IDeleteGateway } from '../IGateway';

export interface ICategoryGateway
  extends ICreateGateway<ISaveCategoryCaseInput>,
    IGetByIdGateway<CategoryBusinessData>,
    IListByFilterGateway<IListCategoryCaseInput, CategoryBusinessData>,
    IDeleteGateway<IHardDeleteCategoryCaseInput> {}

export interface CategoryBusinessData {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly companyId: string;
}
