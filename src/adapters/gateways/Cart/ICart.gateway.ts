import CartItem from 'src/entities/CartItem.entity';

export default interface ICartGateway {
  changeQuantity(input: CartItem): Promise<boolean>;
}
