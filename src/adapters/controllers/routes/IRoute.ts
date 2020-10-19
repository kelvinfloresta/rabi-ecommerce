import { IResponseAsync, RequestMethod } from '../IController';

export interface INotBindedRoute {
  readonly url: string;
  readonly requestMethod: RequestMethod;
  readonly methodName: string;
}

export interface IBindedRoute<TResponse = any, TRequest = any> {
  readonly url: string;
  readonly requestMethod: RequestMethod;
  readonly requestHandler: (request: TRequest) => IResponseAsync<TResponse>;
}

export interface IBindedRouteConfig {
  readonly routes: IBindedRoute[];
  readonly prefix: string;
}

export interface INotBindedRouteConfig {
  readonly routes: INotBindedRoute[];
  prefix: string;
}

export type IAllNotBindedRoute = {
  [controllerName: string]: INotBindedRouteConfig;
};
