import { FastifyInstance } from 'fastify';
import { IRoutes } from './IController';
import BaseController from './Base.controller';

export default class FastifyAdapter implements IRoutes {
  constructor(private fastify: FastifyInstance) {}

  public appendController(controllerInstance: BaseController) {
    this.fastify.register(
      (fastify, _opts, done) => {
        controllerInstance.routes.forEach((route) => {
          fastify[route.method](route.url, async (request, reply) => {
            const [statusCode, response] = await controllerInstance[route.methodName](request);
            reply.status(statusCode).send(response);
          });
        });
        done();
      },
      { prefix: controllerInstance.prefix }
    );
  }
}
