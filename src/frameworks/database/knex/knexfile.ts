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
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'rabi_ecommerce_development',
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
      host: process.env.DB_HOST as any,
      user: process.env.DB_USER as any,
      password: process.env.DB_PASSWORD as any,
      database: process.env.DB_DATABASE as any,
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
