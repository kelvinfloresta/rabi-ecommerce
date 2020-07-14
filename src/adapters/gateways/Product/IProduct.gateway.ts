import Product from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
} from 'src/usecases/Product/IProduct,usecase';
import { IPatchGateway, ISaveGateway, IGetGateway, ILogicDeleteGateway } from '../IGateway';

export default interface IProductGateway
  extends ILogicDeleteGateway,
    IPatchGateway<IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetGateway<string, Product> {}
