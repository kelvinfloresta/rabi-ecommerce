import * as Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { PostgresUUIDV4, addTimestamp } from '../knex-migration.framework';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TableName.product, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    addTimestamp(table, knex, TableName.product);
    table.decimal('price').notNullable();
    table.boolean('active').defaultTo(true).notNullable();
    table.text('description').nullable();

    table.uuid('categoryId').nullable();
    table.foreign('categoryId').references('id').inTable(TableName.category);

    table.uuid('companyId').notNullable();
    table.foreign('companyId').references('id').inTable(TableName.company);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TableName.product);
}
