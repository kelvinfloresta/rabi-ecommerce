export interface IOrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;
}

export interface ICreateOrderCaseInput {
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IOrderItem[];
}

export interface IListOrderCaseInput {
  readonly companyId: string;
}

export interface IListOrderCaseOutput {
  readonly id: string;
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IOrderItem[];
}
