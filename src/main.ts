import 'reflect-metadata';

import { container } from 'tsyringe';
import { AuthController } from './adapters/controllers/Auth/Auth.controller';
import { CategoryController } from './adapters/controllers/Category/Category.controller';
import { AuthCaseFactory } from './usecases/Auth/AuthFactory.usecase';
import { CompanyController } from './adapters/controllers/Company/Company.controller';
import { ProductController } from './adapters/controllers/Product/Product.controller';
import { ProductCaseFactory } from './usecases/Product/ProductFactory.usecase';
import { OrderController } from './adapters/controllers/Order/Order.controller';
import { OrderCaseFactory } from './usecases/Order/OrderFactory.usecase';
import { App } from './adapters/app/AppFactory';
import { FastifyAppFactoryAdapter } from './adapters/app/FastifyRouterFactoryAdapter.route';
import { register } from './adapters/di';
import { UserController } from './adapters/controllers/User/User.controller';

const productController = new ProductController(ProductCaseFactory(), AuthCaseFactory.singleton);
const orderController = new OrderController(OrderCaseFactory.singleton, AuthCaseFactory.singleton);

const app: App = container.resolve(FastifyAppFactoryAdapter);

register();
app.addController(container.resolve(UserController));
app.addController(container.resolve(AuthController));
app.addController(container.resolve(CompanyController));
app.addController(container.resolve(CategoryController));
app.addController(productController);
app.addController(orderController);

app.start();
