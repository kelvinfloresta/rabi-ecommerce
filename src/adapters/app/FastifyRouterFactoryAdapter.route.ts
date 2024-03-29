import fastifyContructor, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyError,
} from 'fastify';

import { config } from 'src/config';
import cors from 'fastify-cors';
import { AuthCase } from 'src/usecases/Auth/Auth.usecase';
import { NotAuthorized } from 'src/utils/errors/NotAuthorized.error';
import { IBindedRoute, IBindedRouteConfig } from './IApp';
import { App } from './AppFactory';
import { injectable } from '../di';
import { IRequest } from '../controllers/IController';

@injectable()
export class FastifyAppFactoryAdapter extends App {
  private fastify = fastifyContructor({
    logger: true,
  });

  constructor(private authCase: AuthCase) {
    super();
    this.fastify.setErrorHandler(FastifyAppFactoryAdapter.errorHandler());
    this.fastify.register(cors);
    this.authHandler();
  }

  private static errorHandler() {
    if (config.envName === 'production') {
      return this.productionErrorHandler;
    }

    return this.developmentErrorHandler;
  }

  private authMiddleware = (request: FastifyRequest) => async () => {
    if (!request.headers.authorization) {
      throw new NotAuthorized();
    }
    return this.authCase.authenticate(request.headers.authorization);
  };

  private authHandler() {
    this.fastify.addHook('onRequest', async (request: FastifyRequest & IRequest) => {
      request.authenticate = this.authMiddleware(request);
    });
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
        params.routes.forEach(FastifyAppFactoryAdapter.adaptOne(fastify));
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
