import { OrderGatewayKnexAdapter } from 'src/adapters/gateways/Order/OrderKnexAdapter.gateway';
import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { TableName } from 'src/adapters/database/Database.adapter';
import {
  IOrderBusinessData,
  IOrderItemBusinessData,
} from 'src/adapters/gateways/Order/IOrder.gateway';
import { OrderCase } from './Order.usecase';
import { ProductCaseFactory } from '../Product/ProductFactory.usecase';

export class OrderCaseFactory {
  public static readonly singleton = OrderCaseFactory.build();

  public static build() {
    const repository = new KnexRepositoryHelper<IOrderBusinessData>(TableName.order);
    const itemRepository = new KnexRepositoryHelper<IOrderItemBusinessData>(TableName.orderItem);
    const orderGateway = new OrderGatewayKnexAdapter(repository, itemRepository);
    const productCase = ProductCaseFactory();
    return new OrderCase(orderGateway, productCase);
  }
}
