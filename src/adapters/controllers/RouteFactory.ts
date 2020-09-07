import { IRoute } from './IController';
import { routesConfig } from './Route.decorator';

export interface IRouteAdaptParams {
  routes: IRoute[];
  prefix: string;
}

export default abstract class RouteFactory {
  public routesConfig = routesConfig;

  public appendController(controllerInstance: any) {
    const controllerName = controllerInstance.constructor.name;
    const { routes, prefix } = this.routesConfig[controllerName];
    const bindedRoutes = routes.map<IRoute>((route) => {
      const requestHandler = controllerInstance[route.methodName].bind(controllerInstance);
      return {
        requestMethod: route.method,
        requestHandler,
        url: route.url,
      };
    });
    this.adapt({ routes: bindedRoutes, prefix });
  }

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  protected abstract adapt(params: IRouteAdaptParams): void;
}
