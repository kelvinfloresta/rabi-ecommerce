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

export interface IListGateway<Filter, T, Output extends Iterable<T> = Array<T>> {
  list(filter: Filter): Promise<Output>;
}

export interface IDeleteGateway<Filter = string> {
  hardDelete(filter: Filter): Promise<boolean>;
}

export interface ILogicDeleteGateway<Filter = string> {
  logicDelete(filter: Filter): Promise<boolean>;
}

export interface IGetGateway<Input, Output> {
  get(input: Input): Promise<Output | undefined>;
}

export interface IPaginateGateway<Filter, Output> {
  paginate(filter: Filter, paginate: IPaginationParams): Promise<IWithPagination<Output>>;
}
