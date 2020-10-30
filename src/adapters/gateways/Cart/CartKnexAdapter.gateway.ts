import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-adapter.framework';
import { CartItem } from 'src/entities/CartItem.entity';
import { IGetCartCaseInput } from 'src/usecases/Cart/ICart.usecase';
import { ICartGateway } from './ICart.gateway';

export class CartGatewayKnexAdapter implements ICartGateway {
  constructor(private repository: KnexRepositoryHelper<CartItem>) {}

  /**
   * TODO: migrate to upsert
   */
  async add(input: CartItem): Promise<boolean> {
    const [response] = await this.repository.instance
      .count('productId')
      .where({ productId: input.productId, userId: input.userId });
    if (Number(response.count) === 0) {
      await this.repository.instance.insert(input);
      return true;
    }

    return this.changeQuantity(input);
  }

  private async changeQuantity(input: CartItem): Promise<boolean> {
    const result = await this.repository.instance
      .increment('quantity', input.quantity)
      .where({ userId: input.userId, productId: input.productId });

    return result > 0;
  }

  async get(input: IGetCartCaseInput): Promise<CartItem> {
    return this.repository.getByFilter(input);
  }
}
