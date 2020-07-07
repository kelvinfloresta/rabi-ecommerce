import { closeDatabase } from 'src/adapters/database/Database.adapter';
import ProductGatewayKnexAdapter from '../../adapters/gateways/Product/ProductKnexAdapter.gateway';
import ProductCase from './Product.usecase';

function makeSut() {
  const productGateway = new ProductGatewayKnexAdapter();
  return new ProductCase(productGateway);
}

afterAll(async () => {
  await closeDatabase();
});

describe('Product Case', () => {
  it('Should return product saved', async () => {
    const productInput = { name: 'cake', price: 1 };
    const sut = makeSut();
    const result = await sut.save(productInput);
    expect(result).toMatchObject(productInput);
  });
});
