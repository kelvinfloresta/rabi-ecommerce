import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { Transaction } from 'knex';
import { IListOrderCaseInput, IListOrderCaseOutput } from 'src/usecases/Order/IOrder.usecase';
import { TableName } from 'src/adapters/database/Database.adapter';
import groupBy from 'lodash/groupBy';
import {
  ICreateOrderGatewayInput,
  IOrderBusinessData,
  IOrderGateway,
  IOrderItemBusinessData,
} from './IOrder.gateway';

export class OrderGatewayKnexAdapter
  extends KnexRepositoryHelper<IOrderBusinessData, ICreateOrderGatewayInput>
  implements IOrderGateway {
  private itemsRepository = new KnexRepositoryHelper<IOrderBusinessData>(TableName.orderItem);

  private companyId = `${TableName.order}.companyId`;

  private userId = `${TableName.user}.id`;

  private orderId = `${TableName.order}.id`;

  private userName = `${TableName.user}.name as userName`;

  constructor() {
    super(TableName.order);
  }

  public async create({
    companyId,
    userId,
    items,
    status,
  }: ICreateOrderGatewayInput): Promise<string> {
    return this.knex.transaction(async (tx) => {
      const [orderId] = await super.instance
        .insert({
          companyId,
          userId,
          status,
        })
        .transacting(tx)
        .returning('id');

      await this.createOrderItems({ items, orderId, tx });

      return orderId;
    });
  }

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
        price: el.price,
      };
    });
    await this.itemsRepository.instance.insert(items).transacting(params.tx);
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
        status: orders[0].status,
      };
    });
  }

  public async listByFilter(filter: IListOrderCaseInput): Promise<IListOrderCaseOutput[]> {
    const result = await super.instance
      .select(
        'orderId',
        'userId',
        'status',
        this.userName,
        'productId',
        'productName',
        'quantity',
        'order_items.price'
      )
      .where(this.companyId, filter.companyId)
      .leftJoin(TableName.user, this.userId, 'userId')
      .innerJoin(TableName.orderItem, this.orderId, 'orderId');
    return OrderGatewayKnexAdapter.adaptList(result);
  }
}
