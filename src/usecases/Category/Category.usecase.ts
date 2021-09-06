import { ICategoryGateway } from 'src/adapters/gateways/Category/ICategory.gateway';
import { Category } from 'src/entities/Category.entity';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import { Id } from 'src/adapters/gateways/IGateway';
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

  async getById(id: Id): Promise<Category | undefined> {
    return this.categoryGateway.getById(id);
  }

  async list(filter: IListCategoryCaseInput): Promise<Category[]> {
    return this.categoryGateway.listByFilter(filter);
  }

  async delete(filter: IHardDeleteCategoryCaseInput): Promise<boolean> {
    return this.categoryGateway.hardDelete(filter);
  }
}
