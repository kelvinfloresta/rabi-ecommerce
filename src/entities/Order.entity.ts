export interface IOrderItem {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export class Order {
  private items: IOrderItem[];

  private cachedTotal = 0;

  public addItem(item: IOrderItem) {
    this.items.push(item);
    this.cachedTotal += item.quantity * item.price;
  }

  get orderItems(): readonly IOrderItem[] {
    return this.items;
  }

  get total() {
    return this.cachedTotal;
  }
}
