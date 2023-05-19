import Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { PostgresUUIDV4 } from '../knex-migration.framework';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TableName.category, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    table.string('description').nullable();
    table.unique(['name', 'companyId']);

    table.uuid('companyId').notNullable();
    table.foreign('companyId').references('id').inTable(TableName.company);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TableName.category);
}
