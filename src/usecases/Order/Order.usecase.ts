import { IOrderGateway } from 'src/adapters/gateways/Order/IOrder.gateway';
import { inject, injectable } from 'src/adapters/di';
import { TYPES } from 'src/adapters/di/types';
import { NotFound } from 'src/errors/NotFound.error';
import { Order } from 'src/entities/Order.entity';
import { ProductBusinessData } from 'src/adapters/gateways/Product/IProduct.gateway';
import {
  ICreateOrderCaseInput,
  IListOrderCaseInput,
  IListOrderCaseOutput,
  INewOrderItem,
} from './IOrder.usecase';
import { ProductCase } from '../Product/Product.usecase';

@injectable()
export class OrderCase {
  constructor(
    @inject(TYPES.OrderGateway) private orderGateway: IOrderGateway,
    private productCase: ProductCase
  ) {}

  public async create(input: ICreateOrderCaseInput) {
    const productIds = input.items.map((el) => el.productId);
    const products = await this.productCase.list({ ids: productIds });

    const order = new Order();
    input.items.forEach(OrderCase.addItem(order, products));

    return this.orderGateway.create({
      companyId: input.companyId,
      userId: input.userId,
      items: order.orderItems,
    });
  }

  private static addItem(order: Order, products: ProductBusinessData[]) {
    return (item: INewOrderItem) => {
      const productFound = products.find((product) => product.id === item.productId);
      if (productFound === undefined) {
        throw new NotFound({ id: item.productId, resource: 'Product' });
      }

      order.addItem({
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        productName: productFound.name,
      });
    };
  }

  async list(filter: IListOrderCaseInput): Promise<IListOrderCaseOutput[]> {
    return this.orderGateway.listByFilter(filter);
  }
}
