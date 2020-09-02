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

export type IResponse<T> = Promise<[StatusCode, T]>;

export interface IRequest<Query = any, Body = any, Params = any> {
  headers: any;
  params: Params;
  query: Query;
  body: Body;
}

export interface IRouteConfig {
  url: string;
  method: RequestMethod;
  methodName: string;
}

export interface IRoute<T = any> {
  url: string;
  requestMethod: RequestMethod;
  requestHandler: T;
}

export type IRoutes = {
  [controllerName: string]: {
    routes: IRouteConfig[];
    prefix: string;
  };
};
