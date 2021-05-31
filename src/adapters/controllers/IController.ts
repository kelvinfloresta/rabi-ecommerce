import { IAuthUser } from 'src/usecases/Auth/IAuth.usecase';

export const enum RequestMethod {
  POST = 'post',
  PATCH = 'patch',
  GET = 'get',
  DELETE = 'delete',
}

export const enum StatusCode {
  badRequest = 400,
  notFound = 404,
  forbidden = 403,
  unauthorized = 401,
  serverError = 500,
  ok = 200,
  created = 201,
  noContent = 204,
}

export interface IResponse<TResponse = undefined, THeader = any> {
  readonly statusCode: StatusCode;
  readonly response: TResponse;
  readonly headers?: THeader;
}

export interface IEmptyResponse<THeader = any> {
  readonly statusCode: StatusCode;
  readonly headers?: THeader;
}

export type IResponseAsync<TResponse = undefined, THeader = any> = Promise<
  IResponse<TResponse, THeader>
>;

export interface IRequest<Query = any, Body = any, Params = any, Header = any> {
  readonly headers: Header;
  readonly params: Params;
  readonly query: Query;
  readonly body: Body;
  authenticate(): Promise<IAuthUser>;
}
