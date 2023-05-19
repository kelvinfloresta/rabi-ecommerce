import { IEnvironmentName } from './IConfig';

export function assertIsNotProduction(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot execute in production mode');
  }
}

function getConfig<T extends string>(configName: string): T {
  const config = process.env[configName];
  if (config === undefined) {
    throw new Error(`Missing config ${configName}`);
  }

  return config as T;
}

function getBooleanConfig(configName: string): boolean {
  const config = getConfig(configName);
  if (config === 'true') {
    return true;
  }

  if (config === 'false') {
    return false;
  }

  throw new Error(`Invalid config ${configName}`);
}

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
  port: +getConfig('PORT'),
};
