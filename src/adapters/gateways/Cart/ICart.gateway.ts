import CartItem from 'src/entities/CartItem.entity';

export default interface ICartGateway {
  add(input: CartItem): Promise<boolean>;
}
