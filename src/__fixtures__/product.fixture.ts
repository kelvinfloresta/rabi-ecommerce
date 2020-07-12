import Product from 'src/entities/Product.entity';
import { uuidv4 } from 'src/__fixtures__/utils/uuid.fixture';
import ProductCaseFactory from 'src/usecases/Product/ProductFactory.usecase';

type IPartialProduct = Partial<Product> & { companyId: string };

export function buildProductFixture(params: IPartialProduct): Product {
  const product = {
    id: params.id || uuidv4(),
    name: params.name || 'The amazing product',
    price: params.price ?? 1,
    disabled: params.disabled || false,
    companyId: params.companyId,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
  return product;
}

export async function createProductFixture(params: IPartialProduct): Promise<Product> {
  const productCase = ProductCaseFactory();
  const product = buildProductFixture(params);
  return productCase.save(product);
}

export async function expectTohaveProduct(product: Partial<Product> & { id: string }) {
  const productCase = ProductCaseFactory();
  const result = await productCase.get(product?.id);
  return expect(result).toMatchObject(product);
}
