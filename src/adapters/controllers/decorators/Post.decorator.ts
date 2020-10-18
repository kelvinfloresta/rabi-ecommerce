import { RequestMethod } from '../IController';
import routesConfig from './_AllNotBindedRoutes';

export default function Post(url: string) {
  return function decorate(target: any, methodName: string) {
    const className = target.constructor.name;
    routesConfig[className] = routesConfig[className] || { routes: [] };
    routesConfig[className].routes.push({ methodName, url, requestMethod: RequestMethod.POST });
  };
}
