import 'reflect-metadata';

import { container } from 'tsyringe';
import { AuthController } from './adapters/controllers/Auth/Auth.controller';
import { CategoryController } from './adapters/controllers/Category/Category.controller';
import { CompanyController } from './adapters/controllers/Company/Company.controller';
import { ProductController } from './adapters/controllers/Product/Product.controller';
import { OrderController } from './adapters/controllers/Order/Order.controller';
import { App } from './adapters/app/AppFactory';
import { FastifyAppFactoryAdapter } from './adapters/app/FastifyRouterFactoryAdapter.route';
import { register } from './adapters/di';
import { UserController } from './adapters/controllers/User/User.controller';

register();
const app: App = container.resolve(FastifyAppFactoryAdapter);

app.addController(container.resolve(UserController));
app.addController(container.resolve(AuthController));
app.addController(container.resolve(CompanyController));
app.addController(container.resolve(CategoryController));
app.addController(container.resolve(ProductController));
app.addController(container.resolve(OrderController));

app.start();
