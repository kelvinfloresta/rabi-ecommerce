import { IListOrderCaseInput, IListOrderCaseOutput } from 'src/usecases/Order/IOrder.usecase';
import { ICreateGateway, IListByFilterGateway } from '../IGateway';

export interface IOrderItemBusinessData {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export interface IOrderBusinessData {
  readonly companyId: string;
  readonly userId: string | null;
  readonly items: readonly IOrderItemBusinessData[];
}

export interface ICreateOrderGatewayInput {
  readonly companyId: string;
  readonly userId: string | null;
  readonly items: readonly IOrderItemBusinessData[];
}

export interface IOrderGateway
  extends IListByFilterGateway<IListOrderCaseInput, IListOrderCaseOutput>,
    ICreateGateway<ICreateOrderGatewayInput> {}
