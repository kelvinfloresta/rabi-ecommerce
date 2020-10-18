import { fastify } from 'fastify';
import UserCaseFactory from './usecases/User/UserFactory.usecase';
import UserController from './adapters/controllers/User/User.controller';
import RouteFactory from './adapters/controllers/routes/RouteFactory.route';
import FastifyRouterFactoryAdapter from './adapters/controllers/routes/FastifyRouterFactoryAdapter.route';

const app = fastify({
  logger: true,
});

const routes: RouteFactory = new FastifyRouterFactoryAdapter(app);
const userController = new UserController(UserCaseFactory.singleton);
routes.addController(userController);

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
