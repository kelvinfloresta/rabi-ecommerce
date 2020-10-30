import { ICartGateway } from 'src/adapters/gateways/Cart/ICart.gateway';
import { CartItem } from 'src/entities/CartItem.entity';
import { IGetCartCaseInput } from './ICart.usecase';

export class CartCase {
  constructor(private CartGateway: ICartGateway) {}

  async add(input: CartItem): Promise<boolean> {
    return this.CartGateway.add(input);
  }

  async get(input: IGetCartCaseInput): Promise<CartItem | undefined> {
    return this.CartGateway.get(input);
  }
}
