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
  IListGateway,
  IDeleteGateway,
  ICommonCompanyFilter,
} from '../IGateway';

export interface IProductGateway
  extends IDeleteGateway<ICommonCompanyFilter>,
    IPatchGateway<IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetGateway<string, Product>,
    IListGateway<IListProductCaseInput, Product> {}
