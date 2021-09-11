import Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { addTimestamp } from '../knex-migration.framework';

export async function up(knex: Knex) {
  return knex.schema.createTable(TableName.orderItem, (table) => {
    addTimestamp(table, knex, TableName.orderItem);

    table.uuid('orderId').notNullable();
    table.foreign('orderId').references('id').inTable(TableName.order).onDelete('CASCADE');

    table.uuid('productId').nullable();
    table.foreign('productId').references('id').inTable(TableName.product);
    table.string('productName').notNullable();

    table.decimal('quantity').notNullable();

    table.decimal('price').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableName.orderItem);
}
