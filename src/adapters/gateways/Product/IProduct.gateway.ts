import Product from 'src/entities/Product.entity';
import { IDeleteGateway, IPatchGateway, ISaveGateway } from '../IGateway';

export default interface IProductGateway extends
  IDeleteGateway, IPatchGateway<Product>, ISaveGateway<Product> {
}
