import Product from 'src/entities/Product.entity';
import { uuidv4 } from 'src/utils/uuid.util';
import ProductCase from 'src/usecases/Product/Product.usecase';

export function buildProductFixture(params: Partial<Product>): Product {
  const product = {
    id: params.id || uuidv4(),
    name: params.name || 'The amazing product',
    price: params.price ?? 1,
    disabled: params.disabled || false,
  };
  return product;
}

export async function createProductFixture(
  params: Partial<Product>,
  productCase: ProductCase,
): Promise<Product> {
  const product = buildProductFixture(params);
  return productCase.save(product);
}
