import { FastifyInstance, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import RouteFactory, { IRouteAdaptParams } from './RouteFactory';

export default class FastifyAdapter extends RouteFactory {
  constructor(private fastify: FastifyInstance) {
    super();
    fastify.setErrorHandler(FastifyAdapter.customErrorHandler);
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
