import { RequestMethod } from './IController';

export const routes = {};

export function Post(url: string) {
  return function decorate(target: any, methodName: string) {
    const className = target.constructor.name;
    routes[className].push({ methodName, url, method: RequestMethod.POST });
  };
}

export function Controller(prefix: string) {
  // routes[constructor.name] = [];
  return function decorate<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public prefix = prefix;
    };
  };
}
