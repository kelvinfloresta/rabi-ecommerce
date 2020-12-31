import { Product } from 'src/entities/Product.entity';

export interface ISaveProductCaseInput {
  readonly name: string;
  readonly price: number;
  readonly description?: string;
  readonly disabled: boolean;
  readonly categoryId: string | null;
  readonly companyId: string;
}

export interface IPatchProductCaseInput {
  readonly name?: string;
  readonly price?: number;
  readonly description?: string;
  readonly active?: boolean;
  readonly categoryId?: string | null;
}

export type IListProductCaseInput = Pick<Product, 'companyId'>;
