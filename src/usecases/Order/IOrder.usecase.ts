export interface IOrderItem {
  readonly productId: string;
  readonly quantity: number;
}

export interface ICreateOrderCaseInput {
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IOrderItem[];
}
