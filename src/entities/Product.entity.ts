import { ILogicDelete, ITimeStamp } from './IEntity';

export default class Product implements ILogicDelete, ITimeStamp {
  public id: string;

  public name: string;

  public price: number;

  public description?: string;

  public disabled: boolean;

  public createdAt: Date;

  public updatedAt: Date;

  public deletedAt: Date | null;
}
