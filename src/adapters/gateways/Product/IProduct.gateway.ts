import { Product } from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import {
  ISaveGateway,
  IGetGateway,
  IListGateway,
  IDeleteGateway,
  ICommonCompanyFilter,
  IPatchByFilterGateway,
} from '../IGateway';

export interface IProductGateway
  extends IDeleteGateway<ICommonCompanyFilter>,
    IPatchByFilterGateway<ICommonCompanyFilter, IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetGateway<string, Product>,
    IListGateway<IListProductCaseInput, Product> {}
