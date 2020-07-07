export function assertIsNotProduction(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot execute in production mode');
  }
}

function getConfig(configName: string) {
  const config = process.env[configName];
  if (config === undefined) {
    throw new Error(`Missing config ${configName}`);
  }

  return config;
}

const config = {
  secretKey: 'secret',
  envName: getConfig('NODE_ENV'),
};

export default config;
