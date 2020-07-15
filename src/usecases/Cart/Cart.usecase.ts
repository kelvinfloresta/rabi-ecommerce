import ICartGateway from 'src/adapters/gateways/Company/ICart.gateway';
import { IChangeQuantityCartCaseInput } from './ICart.usecase';

export default class CartCase {
  constructor(private CartGateway: ICartGateway) {}

  async add(input: IChangeQuantityCartCaseInput): Promise<boolean> {
    return this.CartGateway.save(input);
  }
}
