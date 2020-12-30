import { Product } from 'src/entities/Product.entity';
import { ITimeStamp, ILogicDelete } from 'src/entities/IEntity';

export interface ISaveProductCaseInput {
  readonly name: string;
  readonly price: number;
  readonly description?: string;
  readonly disabled: boolean;
  readonly categoryId: string | null;
  readonly companyId: string;
}

export interface IPatchProductCaseInput
  extends Omit<Partial<Product>, 'companyId' | keyof ITimeStamp | keyof ILogicDelete> {
  id: string;
}

export type IListProductCaseInput = Pick<Product, 'companyId'>;
