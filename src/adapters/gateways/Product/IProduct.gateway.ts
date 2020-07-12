import Product from 'src/entities/Product.entity';
import { IPatchGateway, ISaveGateway, IGetGateway, ILogicDeleteGateway } from '../IGateway';

export default interface IProductGateway
  extends ILogicDeleteGateway,
    IPatchGateway<Product>,
    ISaveGateway<Product>,
    IGetGateway<Product> {}
