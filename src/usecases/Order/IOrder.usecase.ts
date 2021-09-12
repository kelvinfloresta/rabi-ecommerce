import { OrderStatus } from 'src/entities/enums/OrderStatus.enumt';

export interface IListOrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export interface INewOrderItem {
  readonly productId: string;
  readonly quantity: number;
}

export interface ICreateOrderCaseInput {
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly INewOrderItem[];
}

export interface IListOrderCaseInput {
  readonly companyId: string;
}

export interface IListOrderCaseOutput {
  readonly id: string;
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IListOrderItem[];
  readonly status: OrderStatus;
}
