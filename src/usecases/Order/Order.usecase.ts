import { IOrderGateway } from 'src/adapters/gateways/Order/IOrder.gateway';
import { ICreateOrderCaseInput, IListOrderCaseInput, IListOrderCaseOutput } from './IOrder.usecase';
import { ProductCase } from '../Product/Product.usecase';

export class OrderCase {
  constructor(private orderGateway: IOrderGateway, private productCase: ProductCase) {}

  public async create(input: ICreateOrderCaseInput) {
    const itemsPromise = input.items.map(async (item) => {
      const product = await this.productCase.get(item.productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      return {
        productId: product.id,
        quantity: item.quantity,
        productName: product.name,
        total: product.price * item.quantity,
      };
    });

    const items = await Promise.all(itemsPromise);

    return this.orderGateway.create({
      companyId: input.companyId,
      userId: input.userId,
      items,
    });
  }

  async list(filter: IListOrderCaseInput): Promise<IListOrderCaseOutput[]> {
    return this.orderGateway.list(filter);
  }
}
