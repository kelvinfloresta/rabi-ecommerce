import { KnexRepositoryHelper } from 'src/frameworks/database/knex/knex-repository-helper.framework';
import { Transaction } from 'knex';
import {
  IOrderGateway,
  IOrderBusinessData,
  ICreateOrderGatewayInput,
  IOrderItemBusinessData,
} from './IOrder.gateway';

export class OrderGatewayKnexAdapter implements IOrderGateway {
  constructor(
    private readonly orderRepository: KnexRepositoryHelper<IOrderBusinessData>,
    private readonly itemsRepository: KnexRepositoryHelper<IOrderItemBusinessData>
  ) {}

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
}
