import Product from 'src/entities/Product.entity';
import { ITimeStamp, ILogicDelete } from 'src/entities/IEntity';

export interface ISaveProductCaseInput
  extends Omit<Product, 'id' | keyof ITimeStamp | keyof ILogicDelete> {}

export interface IPatchProductCaseInput
  extends Omit<Partial<Product>, 'companyId' | keyof ITimeStamp | keyof ILogicDelete> {
  id: string;
}
