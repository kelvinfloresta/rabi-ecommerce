import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { Transaction } from 'knex';
import { IListOrderCaseInput, IListOrderCaseOutput } from 'src/usecases/Order/IOrder.usecase';
import { TableName } from 'src/adapters/database/Database.adapter';
import groupBy from 'lodash/groupBy';
import {
  IOrderGateway,
  IOrderBusinessData,
  ICreateOrderGatewayInput,
  IOrderItemBusinessData,
} from './IOrder.gateway';

export class OrderGatewayKnexAdapter implements IOrderGateway {
  private orderRepository = new KnexRepositoryHelper<IOrderBusinessData>(TableName.order);

  private itemsRepository = new KnexRepositoryHelper<IOrderItemBusinessData>(TableName.orderItem);

  private companyId = `${TableName.order}.companyId`;

  private userId = `${TableName.user}.id`;

  private orderId = `${TableName.order}.id`;

  private userName = `${TableName.user}.name as userName`;

  private async createOrderItems(params: {
    orderId: string;
    items: readonly IOrderItemBusinessData[];
    tx: Transaction;
  }) {
    const items = params.items.map((el) => {
      return {
        orderId: params.orderId,
        productId: el.productId,
        productName: el.productName,
        quantity: el.quantity,
        total: el.total,
      };
    });
    await this.itemsRepository.instance.insert(items).transacting(params.tx);
  }

  public async create({ companyId, userId, items }: ICreateOrderGatewayInput): Promise<string> {
    return this.orderRepository.knex.transaction(async (tx) => {
      const [orderId] = await this.orderRepository.instance
        .insert({
          companyId,
          userId,
        })
        .transacting(tx)
        .returning('id');

      await this.createOrderItems({ items, orderId, tx });

      return orderId;
    });
  }

  public async listByFilter(filter: IListOrderCaseInput): Promise<IListOrderCaseOutput[]> {
    const result = await this.orderRepository.instance
      .select(
        'orderId',
        'userId',
        this.userName,
        'productId',
        'productName',
        'quantity',
        'order_items.total'
      )
      .where(this.companyId, filter.companyId)
      .leftJoin(TableName.user, this.userId, 'userId')
      .innerJoin(TableName.orderItem, this.orderId, 'orderId');
    return OrderGatewayKnexAdapter.adaptList(result);
  }

  private static adaptList(result: any[]): IListOrderCaseOutput[] {
    const groups = groupBy(result, 'orderId');
    return Object.entries(groups).map(([orderId, orders]) => {
      return {
        id: orderId,
        companyId: orders[0].companyId,
        userId: orders[0].userId,
        userName: orders[0].userName,
        items: orders,
      };
    });
  }
}
