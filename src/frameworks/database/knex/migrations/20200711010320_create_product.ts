import * as Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { PostgresUUIDV4, addSoftDelete, addTimestamp } from '../knex-migration.framework';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TableName.product, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    addSoftDelete(table);
    addTimestamp(table, knex, TableName.product);
    table.decimal('price').notNullable();
    table.boolean('disabled').defaultTo(false).notNullable();
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
