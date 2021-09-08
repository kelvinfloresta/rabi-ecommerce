import {
  ISaveProductCaseInput,
  IPatchProductCaseInput,
  IListProductCaseInput,
} from 'src/usecases/Product/IProduct.usecase';
import {
  ICreateGateway,
  IGetByIdGateway,
  IListByFilterGateway,
  IDeleteGateway,
  ICommonCompanyFilter,
  IPatchByFilterGateway,
  ITimeStamp,
} from '../IGateway';

export interface IProductGateway
  extends IDeleteGateway<ICommonCompanyFilter>,
    IPatchByFilterGateway<ICommonCompanyFilter, IPatchProductCaseInput>,
    ICreateGateway<ISaveProductCaseInput>,
    IGetByIdGateway<ProductBusinessData>,
    IListByFilterGateway<IListProductCaseInput, ProductBusinessData> {}

export interface ProductBusinessData extends ITimeStamp {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description?: string;
  readonly active: boolean;
  readonly categoryId: string | null;
  readonly companyId: string;
}
