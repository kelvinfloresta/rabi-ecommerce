import ICategoryGateway from 'src/adapters/gateways/Category/ICategory.gateway';
import Category from 'src/entities/Category.entity';
import { ISaveCategoryCaseInput } from './ICategory.usecase';

export default class CategoryCase {
  constructor(private categoryGateway: ICategoryGateway) {}

  async save(input: ISaveCategoryCaseInput): Promise<string> {
    return this.categoryGateway.save(input);
  }

  async getById(id: string): Promise<Category> {
    return this.categoryGateway.get(id);
  }
}
