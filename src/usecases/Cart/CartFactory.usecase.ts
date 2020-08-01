import CartGatewayKnexAdapter from 'src/adapters/gateways/Cart/CartKnexAdapter.gateway';
import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import CartItem from 'src/entities/CartItem.entity';
import CartCase from './Cart.usecase';

export default class CartCaseFactory {
  public static readonly singleton = CartCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<CartItem>(CartGatewayKnexAdapter.tableName);
    const CartGateway = new CartGatewayKnexAdapter(repository);
    return new CartCase(CartGateway);
  }
}
