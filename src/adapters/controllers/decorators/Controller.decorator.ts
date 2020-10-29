import { routesConfig } from './_AllNotBindedRoutes';

export function Controller(prefix: string) {
  return function decorate<T extends { new (...args: any[]): {} }>(constructor: T) {
    routesConfig[constructor.name].prefix = prefix;
    return constructor;
  };
}
