import ICartGateway from 'src/adapters/gateways/Cart/ICart.gateway';
import CartItem from 'src/entities/CartItem.entity';

export default class CartCase {
  constructor(private CartGateway: ICartGateway) {}

  async add(input: CartItem): Promise<boolean> {
    return this.CartGateway.add(input);
  }
}
