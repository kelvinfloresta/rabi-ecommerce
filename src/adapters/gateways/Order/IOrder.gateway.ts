export interface IOrderItemBusinessData {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;
}

export interface IOrderBusinessData {
  readonly total: number;
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IOrderItemBusinessData[];
}

export interface ICreateOrderGatewayInput {
  readonly companyId: string;
  readonly userId: string;
  readonly items: readonly IOrderItemBusinessData[];
}

export interface IOrderGateway {
  create(input: ICreateOrderGatewayInput): Promise<string>;
}