import Category from 'src/entities/Category.entity';
import CategoryCaseFactory from 'src/usecases/Category/CategoryFactory.usecase';
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
  const categoryCase = CategoryCaseFactory();
  const category = buildCategoryFixture(params);
  const categoryId = await categoryCase.save(category);
  return categoryId;
}

export async function expectTohaveCategory(id: string, category: Partial<Category>) {
  const categoryCase = CategoryCaseFactory();
  const result = await categoryCase.getById(id);
  return expect(result).toMatchObject(category);
}
