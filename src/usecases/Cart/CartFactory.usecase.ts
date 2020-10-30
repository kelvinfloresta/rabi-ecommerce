import { CartGatewayKnexAdapter } from 'src/adapters/gateways/Cart/CartKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { CartItem } from 'src/entities/CartItem.entity';
import { TableName } from 'src/adapters/database/Database.adapter';
import { CartCase } from './Cart.usecase';

export class CartCaseFactory {
  public static readonly singleton = CartCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<CartItem>(TableName.cart);
    const CartGateway = new CartGatewayKnexAdapter(repository);
    return new CartCase(CartGateway);
  }
}
