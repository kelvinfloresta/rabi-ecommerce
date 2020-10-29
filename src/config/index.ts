import { getConfig } from './Config';

type IEnvironmentName = 'development' | 'production' | 'test';

export const config = {
  secretKey: 'secret',
  envName: getConfig<IEnvironmentName>('NODE_ENV'),
};

export { assertIsNotProduction } from './Config';
