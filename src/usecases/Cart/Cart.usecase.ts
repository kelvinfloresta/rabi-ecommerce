import ICartGateway from 'src/adapters/gateways/Cart/ICart.gateway';
import { IChangeQuantityCartCaseInput } from './ICart.usecase';

export default class CartCase {
  constructor(private CartGateway: ICartGateway) {}

  async changeQuantity(input: IChangeQuantityCartCaseInput): Promise<boolean> {
    return this.CartGateway.changeQuantity(input);
  }
}
