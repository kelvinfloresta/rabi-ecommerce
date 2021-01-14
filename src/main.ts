import { fastify } from 'fastify';
import { UserCaseFactory } from './usecases/User/UserFactory.usecase';
import { UserController } from './adapters/controllers/User/User.controller';
import { RouteFactory } from './adapters/controllers/routes/RouteFactory.route';
import { FastifyRouterFactoryAdapter } from './adapters/controllers/routes/FastifyRouterFactoryAdapter.route';
import { AuthController } from './adapters/controllers/Auth/Auth.controller';
import { CategoryController } from './adapters/controllers/Category/Category.controller';
import { AuthCaseFactory } from './usecases/Auth/AuthFactory.usecase';
import { CategoryCaseFactory } from './usecases/Category/CategoryFactory.usecase';
import { CompanyController } from './adapters/controllers/Company/Company.controller';
import { CompanyCaseFactory } from './usecases/Company/CompanyFactory.usecase';
import { ProductController } from './adapters/controllers/Product/Product.controller';
import { ProductCaseFactory } from './usecases/Product/ProductFactory.usecase';
import { OrderController } from './adapters/controllers/Order/Order.controller';
import { OrderCaseFactory } from './usecases/Order/OrderFactory.usecase';

const app = fastify({
  logger: true,
});

const routes: RouteFactory = new FastifyRouterFactoryAdapter(app);
const userController = new UserController(UserCaseFactory.singleton);
const authController = new AuthController(AuthCaseFactory.singleton);
const companyController = new CompanyController(CompanyCaseFactory());
const categoryController = new CategoryController(
  CategoryCaseFactory.singleton,
  AuthCaseFactory.singleton
);

const productController = new ProductController(ProductCaseFactory(), AuthCaseFactory.singleton);
const orderController = new OrderController(OrderCaseFactory.singleton, AuthCaseFactory.singleton);

routes.addController(userController);
routes.addController(authController);
routes.addController(categoryController);
routes.addController(companyController);
routes.addController(productController);
routes.addController(orderController);

routes.start();
