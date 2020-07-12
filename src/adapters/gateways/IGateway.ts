export interface IPatchGateway<Input, Output = void> {
  patch(input: Input): Promise<Output>;
}

export interface ISaveGateway<Input, Output = string> {
  save(input: Input): Promise<Output>;
}

export interface IDeleteGateway<Filter = string> {
  delete(filter: Filter): Promise<boolean>;
}

export interface ILogicDeleteGateway<Filter = string> {
  logicDelete(filter: Filter): Promise<boolean>;
}

export interface IGetGateway<Output, Filter = string> {
  get(filter: Filter): Promise<Output>;
}
