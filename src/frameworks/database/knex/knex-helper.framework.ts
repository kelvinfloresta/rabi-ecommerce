import Knex = require('knex');

export function PostgresUUIDV4(knex: Knex): Knex.Raw {
  return knex.raw('uuid_generate_v4()');
}

export async function addTimestamp(
  table: Knex.CreateTableBuilder,
  knex: Knex,
  tableName: string,
): Promise<void> {
  table.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table.timestamp('updatedAt', { useTz: false }).notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  await knex.raw(`
    CREATE TRIGGER ${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `);
}
