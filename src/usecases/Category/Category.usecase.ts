import { ICategoryGateway } from 'src/adapters/gateways/Category/ICategory.gateway';
import { Category } from 'src/entities/Category.entity';
import { ISaveCategoryCaseInput, IListCategoryCaseInput } from './ICategory.usecase';

export class CategoryCase {
  constructor(private categoryGateway: ICategoryGateway) {}

  async save(input: ISaveCategoryCaseInput): Promise<string> {
    return this.categoryGateway.save(input);
  }

  async getById(id: string): Promise<Category | undefined> {
    return this.categoryGateway.get(id);
  }

  async list(filter: IListCategoryCaseInput): Promise<Category[]> {
    return this.categoryGateway.list(filter);
  }
}
