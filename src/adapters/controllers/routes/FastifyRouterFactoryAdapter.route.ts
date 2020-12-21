import { FastifyInstance, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { config } from 'src/config';
import cors from 'fastify-cors';
import { IBindedRoute, IBindedRouteConfig } from './IRoute';
import { RouteFactory } from './RouteFactory.route';

export class FastifyRouterFactoryAdapter extends RouteFactory {
  constructor(private fastify: FastifyInstance) {
    super();
    fastify.setErrorHandler(FastifyRouterFactoryAdapter.errorHandler());
    fastify.register(cors);
  }

  private static errorHandler() {
    if (config.envName === 'production') {
      return this.productionErrorHandler;
    }

    return this.developmentErrorHandler;
  }

  private static productionErrorHandler(
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply
  ): void {
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
      message: 'Internal Server Error',
    });
  }

  private static developmentErrorHandler(
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply
  ): void {
    console.error(error);
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
      message: 'Internal Server Error',
      originalError: error,
    });
  }

  protected adapt(params: IBindedRouteConfig) {
    this.fastify.register(
      (fastify, _opts, done) => {
        params.routes.forEach(FastifyRouterFactoryAdapter.adaptOne(fastify));
        done();
      },
      { prefix: params.prefix }
    );
  }

  private static adaptOne = (fastify: FastifyInstance) => (route: IBindedRoute) => {
    fastify[route.requestMethod](route.url, async (request, reply) => {
      const { statusCode, response } = await route.requestHandler(request);
      reply.status(statusCode).send(response);
    });
  };

  public async start(): Promise<void> {
    const { port } = config;
    this.fastify.listen(port, '0.0.0.0', (err, address) => {
      if (err) throw err;
      this.fastify.log.info(`server listening on ${address}`);
    });
  }
}
