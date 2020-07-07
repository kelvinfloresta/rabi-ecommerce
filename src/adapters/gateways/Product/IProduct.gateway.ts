// eslint-disable-next-line no-unused-vars
import Product from 'src/entities/Product.entity';

export default interface IProductGateway {
  save(input: Pick<Product, 'description'| 'name'| 'price'>): Promise<Product>
}
