import { routesConfig } from '../controllers/decorators/_AllNotBindedRoutes';
import { IBindedRoute, IBindedRouteConfig, INotBindedRoute } from './IApp';

interface IAnyClassInstance {
  constructor: { name: string };
}

export abstract class App {
  private readonly routesConfig = routesConfig;

  private static makeBindRoute(controllerInstance: IAnyClassInstance) {
    return (route: INotBindedRoute): IBindedRoute => {
      const requestHandler = controllerInstance[route.methodName].bind(controllerInstance);
      return {
        requestMethod: route.requestMethod,
        requestHandler,
        url: route.url,
      };
    };
  }

  public addController(controllerInstance: IAnyClassInstance) {
    const controllerName = controllerInstance.constructor.name;
    const { routes, prefix } = this.routesConfig[controllerName];
    const bindRoute = App.makeBindRoute(controllerInstance);
    const bindedRoutes = routes.map(bindRoute);
    this.adapt({ routes: bindedRoutes, prefix });
  }

  protected abstract adapt(params: IBindedRouteConfig): void;

  public abstract start(): Promise<void>;
}
