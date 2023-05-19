import { config as envConfig } from 'src/config';

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

const { database } = envConfig;
const config: IConfig = {
  development: {
    client: 'pg',
    connection: {
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.name,
      debug: database.debug,
      charset: 'utf8',
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
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.name,
      debug: database.debug,
      charset: 'utf8',
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
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.name,
      debug: database.debug,
      charset: 'utf8',
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
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.name,
      debug: database.debug,
      charset: 'utf8',
    },
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },
};

export = config;
