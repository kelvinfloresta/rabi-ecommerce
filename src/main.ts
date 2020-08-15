import { fastify } from 'fastify';
import UserCaseFactory from './usecases/User/UserFactory.usecase';
import FastifyAdapter from './adapters/controllers/FastifyAdapter.controller';
import UserController from './adapters/controllers/User.controller';
import { IRoutes } from './adapters/controllers/IController';

const app = fastify({
  logger: true,
});

const routes: IRoutes = new FastifyAdapter(app);

const userController = new UserController(UserCaseFactory.singleton);
routes.appendController(userController);

// Run the server!
app.listen(3000, (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
