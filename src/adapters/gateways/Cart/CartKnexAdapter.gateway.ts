import KnexRepositoryHelper from 'src/frameworks/database/knex/knex-adapter.framework';
import { IChangeQuantityCartCaseInput } from 'src/usecases/Cart/ICart.usecase';
import CartItem from 'src/entities/CartItem.entity';
import ICartGateway from './ICart.gateway';

export default class CartGatewayKnexAdapter implements ICartGateway {
  public static readonly tableName = 'CartItem';

  constructor(private cartItemRepository: KnexRepositoryHelper<CartItem>) {}

  async changeQuantity(input: IChangeQuantityCartCaseInput): Promise<boolean> {
    const result = await this.cartItemRepository.updateByFilter(
      { quantity: input.quantity },
      { userId: input.userId, productId: input.productId }
    );

    return result > 0;
  }
}
