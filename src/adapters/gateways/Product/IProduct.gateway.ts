import Product from 'src/entities/Product.entity';
import {
  IDeleteGateway, IPatchGateway, ISaveGateway, IGetGateway,
} from '../IGateway';

export default interface IProductGateway
  extends
  IDeleteGateway,
  IPatchGateway<Product>,
  ISaveGateway<Product>,
  IGetGateway<Product>
{}
