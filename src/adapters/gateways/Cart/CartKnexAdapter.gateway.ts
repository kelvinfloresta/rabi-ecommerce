import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import CartItem from 'src/entities/CartItem.entity';
import ICartGateway from './ICart.gateway';

export default class CartGatewayKnexAdapter implements ICartGateway {
  public static readonly tableName = 'CartItem';

  constructor(private repository: KnexRepositoryHelper<CartItem>) {}

  async changeQuantity(input: CartItem): Promise<boolean> {
    const result = await this.repository.updateByFilter(
      { userId: input.userId, productId: input.productId },
      { quantity: input.quantity }
    );

    return result > 0;
  }
}
