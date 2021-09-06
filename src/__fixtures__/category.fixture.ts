import { container } from 'src/adapters/di';
import { Category } from 'src/entities/Category.entity';
import { CategoryCase } from 'src/usecases/Category/Category.usecase';
import { ISaveCategoryCaseInput } from 'src/usecases/Category/ICategory.usecase';

type IPartialSaveCategoryCase = Partial<ISaveCategoryCaseInput> & { companyId: string };

export function buildCategoryFixture(params: IPartialSaveCategoryCase): ISaveCategoryCaseInput {
  const category = {
    name: params.name || 'Quantic Weapons',
    description: params.description || 'Nice weapons to clean your kitchen from cockroaches',
    companyId: params.companyId,
  };
  return category;
}

export async function createCategoryFixture(params: IPartialSaveCategoryCase): Promise<string> {
  const category = buildCategoryFixture(params);
  const categoryId = await container.resolve(CategoryCase).save(category);
  return categoryId;
}

export async function expectTohaveCategory(id: string, category: Partial<Category>) {
  const result = await container.resolve(CategoryCase).getById(id);
  return expect(result).toMatchObject(category);
}
