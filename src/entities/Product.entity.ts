import { ITimeStamp } from './IEntity';

export class Product implements ITimeStamp {
  public id: string;

  public name: string;

  public price: number;

  public description?: string;

  public disabled: boolean;

  public categoryId: string | null;

  public companyId: string;

  public createdAt: Date;

  public updatedAt: Date;
}
