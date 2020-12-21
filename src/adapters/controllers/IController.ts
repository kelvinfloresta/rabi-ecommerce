export const enum RequestMethod {
  POST = 'post',
  GET = 'get',
}

export const enum StatusCode {
  badRequest = 400,
  forbidden = 403,
  unauthorized = 401,
  serverError = 500,
  ok = 200,
  created = 201,
  noContent = 204,
}

export interface IResponse<TResponse = undefined, THeader = any> {
  readonly statusCode: StatusCode;
  readonly response?: TResponse;
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
}
