import { getConfig } from 'src/config/Config';

interface IConnection {
  client: string;
  connection: {
    host: string;
    user: string;
    password: string;
    database: string;
    charset: string;
    debug: boolean;
  };
  pool: { min: number; max: number };
  migrations: {
    tableName: string;
    extension: string;
  };
}

interface IConfig {
  development: IConnection;
  test: IConnection;
  staging: IConnection;
  production: IConnection;
}

const config: IConfig = {
  development: {
    client: 'pg',
    connection: {
      host: getConfig('DB_HOST'),
      user: getConfig('DB_USER'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      charset: 'utf8',
      debug: true,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: getConfig('DB_HOST'),
      user: getConfig('DB_USER'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      charset: 'utf8',
      debug: false,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: getConfig('DB_HOST'),
      user: getConfig('DB_USER'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      charset: 'utf8',
      debug: true,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: getConfig('DB_HOST'),
      user: getConfig('DB_USER'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      charset: 'utf8',
      debug: false,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },
};

export = config;
