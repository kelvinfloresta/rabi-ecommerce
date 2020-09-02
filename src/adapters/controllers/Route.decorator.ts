import { RequestMethod, IRoutes } from './IController';

export const routesConfig: IRoutes = {};

export function Post(url: string) {
  return function decorate(target: any, methodName: string) {
    const className = target.constructor.name;
    routesConfig[className] = routesConfig[className] || { routes: [] };
    routesConfig[className].routes.push({ methodName, url, method: RequestMethod.POST });
  };
}

export function Controller(prefix: string) {
  return function decorate<T extends { new (...args: any[]): {} }>(constructor: T) {
    routesConfig[constructor.name].prefix = prefix;
    return constructor;
  };
}
