import * as Knex from 'knex';
import ProductGatewayKnexAdapter from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import { PostgresUUIDV4 } from '../knex-helper.framework';

const { tableName } = ProductGatewayKnexAdapter;

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(tableName, (table) => {
      table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.boolean('disabled').defaultTo(false).notNullable();
      table.text('description').nullable();
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}
