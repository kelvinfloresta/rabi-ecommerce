import { Product } from 'src/entities/Product.entity';
import { ProductCaseFactory } from 'src/usecases/Product/ProductFactory.usecase';
import { ISaveProductCaseInput } from 'src/usecases/Product/IProduct.usecase';

type IPartialSaveProductCase = Partial<ISaveProductCaseInput> & {
  companyId: string;
};

export function buildProductFixture(params: IPartialSaveProductCase): ISaveProductCaseInput {
  const product = {
    name: params.name || 'The amazing product',
    price: params.price ?? 1,
    disabled: params.disabled || false,
    companyId: params.companyId,
    categoryId: params.categoryId || null,
  };
  return product;
}

export async function createProductFixture(params: IPartialSaveProductCase): Promise<Product> {
  const productCase = ProductCaseFactory();
  const product = buildProductFixture(params);
  const productId = await productCase.save(product);
  const productCreated = await productCase.get(productId);
  if (!productCreated) {
    throw new Error('Failed on createProductFixture');
  }

  return productCreated;
}

export async function expectTohaveProduct(id: string, product: Partial<Product>) {
  const productCase = ProductCaseFactory();
  const result = await productCase.get(id);
  return expect(result).toMatchObject(product);
}
