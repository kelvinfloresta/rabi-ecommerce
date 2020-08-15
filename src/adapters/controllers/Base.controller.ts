import { IRoute } from './IController';

export default abstract class BaseController {
  public routes: IRoute[] = [];

  abstract prefix: string;
}
