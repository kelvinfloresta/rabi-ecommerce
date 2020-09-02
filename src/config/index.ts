import { getConfig } from './Config';

type IEnvironmentName = 'development' | 'production' | 'test';

const config = {
  secretKey: 'secret',
  envName: getConfig<IEnvironmentName>('NODE_ENV'),
};

export { assertIsNotProduction } from './Config';

export default config;
