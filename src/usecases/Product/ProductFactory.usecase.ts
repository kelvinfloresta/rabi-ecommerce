import ProductGatewayKnexAdapter from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import ProductCase from './Product.usecase';

export default function ProductCaseFactory() {
  const productGateway = new ProductGatewayKnexAdapter();
  return new ProductCase(productGateway);
}
