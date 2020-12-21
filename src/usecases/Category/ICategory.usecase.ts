import { Category } from 'src/entities/Category.entity';

export interface ISaveCategoryCaseInput extends Omit<Category, 'id'> {}

export interface IListCategoryCaseInput extends Pick<Category, 'companyId'> {}

export interface IHardDeleteCategoryCaseInput {
  readonly id: string;
  readonly companyId: string;
}
