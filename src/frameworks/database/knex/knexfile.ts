import Knex = require('knex');

interface IConfig {
  development: Knex.Config
  test: Knex.Config
  staging: Knex.Config
  production: Knex.Config
}

const config: IConfig = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'rabi_ecommerce_dev',
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
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'rabi_ecommerce_test',
      charset: 'utf8',
      debug: true,
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
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'rabi_ecommerce_staging',
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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
