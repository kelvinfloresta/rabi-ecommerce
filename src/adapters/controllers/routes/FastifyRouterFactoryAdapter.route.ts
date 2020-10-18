import { FastifyInstance, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { IBindedRoute, IBindedRouteConfig } from './IRoute';
import RouteFactory from './RouteFactory.route';

export default class FastifyRouterFactoryAdapter extends RouteFactory {
  constructor(private fastify: FastifyInstance) {
    super();
    fastify.setErrorHandler(FastifyRouterFactoryAdapter.customErrorHandler);
  }

  private static customErrorHandler(
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    if (error.name === 'ValidatorError') {
      reply.status(400).send({
        statusCode: 400,
        error: 'Validation',
        message: error.message,
      });
      return;
    }

    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }

  protected adapt(params: IBindedRouteConfig) {
    this.fastify.register(
      (_, _opts, done) => {
        params.routes.forEach(this.adaptOne);
        done();
      },
      { prefix: params.prefix }
    );
  }

  private adaptOne(route: IBindedRoute) {
    this.fastify[route.requestMethod](route.url, async (request, reply) => {
      const { statusCode, response } = await route.requestHandler(request);
      reply.status(statusCode).send(response);
    });
  }
}
