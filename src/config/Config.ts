export function assertIsNotProduction(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot execute in production mode');
  }
}

export function getConfig<T extends string>(configName: string): T {
  const config = process.env[configName];
  if (config === undefined) {
    throw new Error(`Missing config ${configName}`);
  }

  return config as T;
}

export function getBooleanConfig(configName: string): boolean {
  const config = getConfig(configName);
  if (config === 'true') {
    return true;
  }

  if (config === 'false') {
    return false;
  }

  throw new Error(`Invalid config ${configName}`);
}
