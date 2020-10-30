import Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { addTimestamp } from '../knex-migration.framework';

export async function up(knex: Knex) {
  return knex.schema.createTable(TableName.cart, (table) => {
    addTimestamp(table, knex, TableName.cart);

    table.uuid('productId').notNullable();
    table.foreign('productId').references('id').inTable(TableName.product);

    table.uuid('userId').notNullable();
    table.foreign('userId').references('id').inTable(TableName.user);

    table.unique(['userId', 'productId']);

    table.decimal('quantity').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableName.cart);
}
