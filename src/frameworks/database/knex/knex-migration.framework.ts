import Knex from 'knex';
import { config } from 'src/config';
import knexFile from './knexfile';

export function PostgresUUIDV4(knex: Knex): Knex.Raw {
  return knex.raw('uuid_generate_v4()');
}

export async function addTimestamp(
  table: Knex.CreateTableBuilder,
  knex: Knex,
  tableName: string
): Promise<void> {
  table
    .timestamp('createdAt', { useTz: false })
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table
    .timestamp('updatedAt', { useTz: false })
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  await knex.raw(`
    CREATE TRIGGER ${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `);
}

export function addSoftDelete(table: Knex.CreateTableBuilder): void {
  table.timestamp('deletedAt', { useTz: false }).nullable().defaultTo(null);
}

function getConnection() {
  const { envName } = config;
  const databaseConfig = knexFile[envName];
  const params = {
    client: databaseConfig.client,
    connection: {
      host: databaseConfig.connection.host,
      user: databaseConfig.connection.user,
      password: databaseConfig.connection.password,
      charset: databaseConfig.connection.charset,
    },
  };

  const knex = Knex(params);
  return { knex, databaseConfig };
}

export async function rebuildDatabase() {
  const { knex, databaseConfig } = getConnection();

  await knex.raw(`DROP DATABASE IF EXISTS ${databaseConfig.connection.database}`);
  await knex.raw(`CREATE DATABASE ${databaseConfig.connection.database}`);
  await knex.destroy();
}

export async function createDatabase() {
  const { knex, databaseConfig } = getConnection();
  const result = await knex.raw(
    `SELECT 1 from pg_database WHERE datname='${databaseConfig.connection.database}';`
  );
  if (result.rowCount === 0) {
    await knex.raw(`CREATE DATABASE ${databaseConfig.connection.database}`);
  }
  await knex.destroy();
}
