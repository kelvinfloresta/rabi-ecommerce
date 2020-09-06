import { fastify } from 'fastify';
import UserCaseFactory from './usecases/User/UserFactory.usecase';
import FastifyAdapter from './adapters/controllers/FastifyAdapter.controller';
import UserController from './adapters/controllers/User/User.controller';
import RouteConfig from './adapters/controllers/RouteConfig';
import AJVValidatorAdapter from './adapters/Validator/AJVValidator.validator';

const app = fastify({
  logger: true,
});

const routes: RouteConfig = new FastifyAdapter(app);
const userController = new UserController(UserCaseFactory.singleton, AJVValidatorAdapter);
routes.appendController(userController);

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
