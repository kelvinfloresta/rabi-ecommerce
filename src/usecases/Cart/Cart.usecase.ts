import ICartGateway from 'src/adapters/gateways/Cart/ICart.gateway';
import CartItem from 'src/entities/CartItem.entity';

export default class CartCase {
  constructor(private CartGateway: ICartGateway) {}

  async changeQuantity(input: CartItem): Promise<boolean> {
    return this.CartGateway.changeQuantity(input);
  }
}
