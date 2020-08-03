import Product from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IPaginateProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import {
  IPatchGateway,
  ISaveGateway,
  IGetGateway,
  ILogicDeleteGateway,
  IPaginateGateway,
} from '../IGateway';

export default interface IProductGateway
  extends ILogicDeleteGateway,
    IPatchGateway<IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetGateway<string, Product>,
    IPaginateGateway<IPaginateProductCaseInput, Product> {}
