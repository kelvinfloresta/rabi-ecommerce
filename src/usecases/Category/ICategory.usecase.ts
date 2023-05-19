import { CategoryBusinessData } from 'src/adapters/gateways/Category/ICategory.gateway';

export interface ISaveCategoryCaseInput extends Omit<CategoryBusinessData, 'id'> {}

export interface IListCategoryCaseInput extends Pick<CategoryBusinessData, 'companyId'> {}

export interface IHardDeleteCategoryCaseInput {
  readonly id: string;
  readonly companyId: string;
}
