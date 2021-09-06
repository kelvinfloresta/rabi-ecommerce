import { IPaginationParams, IWithPagination } from 'src/usecases/IPaginate';

export interface IPatchByFilterGateway<TFilter, Input, Output = boolean> {
  patchByFilter(filter: TFilter, input: Input): Promise<Output>;
}

export interface IPatchGateway<Input, Output = boolean> {
  patch(input: Input): Promise<Output>;
}

export interface ISaveGateway<Input, Output = string> {
  save(input: Input): Promise<Output>;
}

export interface ICreateGateway<Input, Output = string> {
  create(input: Input): Promise<Output>;
}

export interface IListByFilterGateway<Filter, T, Output extends Iterable<T> = Array<T>> {
  listByFilter(filter: Filter): Promise<Output>;
}

export interface IDeleteGateway<Filter = string> {
  hardDelete(filter: Filter): Promise<boolean>;
}

export interface ILogicDeleteGateway<Filter = string> {
  logicDelete(filter: Filter): Promise<boolean>;
}

export interface Id {
  readonly id: string;
}

export interface IGetByIdGateway<Output, Input = Id> {
  getById(input: Input): Promise<Output | undefined>;
}

export interface IPaginateGateway<Filter, Output> {
  paginate(filter: Filter, paginate: IPaginationParams): Promise<IWithPagination<Output>>;
}

export interface ICommonCompanyFilter {
  readonly companyId: string;
  readonly id: string;
}
