import { ICategoryGateway } from 'src/adapters/gateways/Category/ICategory.gateway';
import { Category } from 'src/entities/Category.entity';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import {
  ISaveCategoryCaseInput,
  IListCategoryCaseInput,
  IHardDeleteCategoryCaseInput,
} from './ICategory.usecase';

@injectable()
export class CategoryCase {
  constructor(@inject(TYPES.CategoryGateway) private categoryGateway: ICategoryGateway) {}

  async save(input: ISaveCategoryCaseInput): Promise<string> {
    return this.categoryGateway.save(input);
  }

  async getById(id: string): Promise<Category | undefined> {
    return this.categoryGateway.get(id);
  }

  async list(filter: IListCategoryCaseInput): Promise<Category[]> {
    return this.categoryGateway.list(filter);
  }

  async delete(filter: IHardDeleteCategoryCaseInput): Promise<boolean> {
    return this.categoryGateway.hardDelete(filter);
  }
}
