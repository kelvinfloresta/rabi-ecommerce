import CartItem from 'src/entities/CartItem.entity';
import { IGetCartCaseInput } from 'src/usecases/Cart/ICart.usecase';
import { IGetGateway } from '../IGateway';

export default interface ICartGateway extends IGetGateway<IGetCartCaseInput, CartItem> {
  add(input: CartItem): Promise<boolean>;
}
