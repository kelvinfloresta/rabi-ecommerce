import { FastifyInstance } from 'fastify';
import RouteConfig, { IRouteAdaptParams } from './RouteConfig';

export default class FastifyAdapter extends RouteConfig {
  constructor(private fastify: FastifyInstance) {
    super();
  }

  protected adapt(params: IRouteAdaptParams) {
    this.fastify.register(
      (fastify, _opts, done) => {
        params.routes.forEach((route) => {
          fastify[route.requestMethod](route.url, async (request, reply) => {
            const [statusCode, response] = await route.requestHandler(request);
            reply.status(statusCode).send(response);
          });
        });
        done();
      },
      { prefix: params.prefix }
    );
  }
}
