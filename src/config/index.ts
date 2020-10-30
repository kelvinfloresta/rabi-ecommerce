import { getBooleanConfig, getConfig } from './Config';

export type IEnvironmentName = 'development' | 'production' | 'test';

export const config = {
  secretKey: getConfig('AUTH_SECRET'),
  envName: getConfig<IEnvironmentName>('NODE_ENV'),
  database: {
    host: getConfig('DB_HOST'),
    user: getConfig('DB_USER'),
    password: getConfig('DB_PASSWORD'),
    name: getConfig('DB_NAME'),
    debug: getBooleanConfig('DB_DEBUG'),
  },
};

export { assertIsNotProduction } from './Config';
