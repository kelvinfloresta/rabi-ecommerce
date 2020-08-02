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

type IEnvironmentName = 'development' | 'production' | 'test';

const config = {
  secretKey: 'secret',
  envName: getConfig<IEnvironmentName>('NODE_ENV'),
};

export default config;
