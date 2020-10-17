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
  readonly headers: any;
  readonly params: Params;
  readonly query: Query;
  readonly body: Body;
}

export interface IRouteConfig {
  readonly url: string;
  readonly method: RequestMethod;
  readonly methodName: string;
}

export interface IRoute<T = any> {
  readonly url: string;
  readonly requestMethod: RequestMethod;
  readonly requestHandler: (request: any) => IResponse<T>;
}

export type IRoutes = {
  [controllerName: string]: {
    routes: IRouteConfig[];
    prefix: string;
  };
};
