import { Product } from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import {
  IPatchGateway,
  ISaveGateway,
  IGetGateway,
  ILogicDeleteGateway,
  IListGateway,
} from '../IGateway';

export interface IProductGateway
  extends ILogicDeleteGateway,
    IPatchGateway<IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetGateway<string, Product>,
    IListGateway<IListProductCaseInput, Product> {}
