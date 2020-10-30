import { getConfig } from './Config';

export type IEnvironmentName = 'development' | 'production' | 'test';

export const config = {
  secretKey: getConfig('AUTH_SECRET'),
  envName: getConfig<IEnvironmentName>('NODE_ENV'),
};

export { assertIsNotProduction } from './Config';
