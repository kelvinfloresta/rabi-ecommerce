import { Product } from 'src/entities/Product.entity';
import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import {
  ISaveGateway,
  IGetByIdGateway,
  IListByFilterGateway,
  IDeleteGateway,
  ICommonCompanyFilter,
  IPatchByFilterGateway,
} from '../IGateway';

export interface IProductGateway
  extends IDeleteGateway<ICommonCompanyFilter>,
    IPatchByFilterGateway<ICommonCompanyFilter, IPatchProductCaseInput>,
    ISaveGateway<ISaveProductCaseInput>,
    IGetByIdGateway<Product>,
    IListByFilterGateway<IListProductCaseInput, Product> {}
