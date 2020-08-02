import Knex from 'knex';
import CartGatewayKnexAdapter from 'src/adapters/gateways/Cart/CartKnexAdapter.gateway';
import UserGatewayKnexAdapter from 'src/adapters/gateways/User/UserKnexAdapter.gateway';
import ProductGatewayKnexAdapter from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import { addTimestamp } from '../knex-migration.framework';

const { tableName } = CartGatewayKnexAdapter;
const { tableName: userTable } = UserGatewayKnexAdapter;
const { tableName: productTable } = ProductGatewayKnexAdapter;

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    addTimestamp(table, knex, tableName);

    table.uuid('productId').notNullable();
    table.foreign('productId').references('id').inTable(productTable);

    table.uuid('userId').notNullable();
    table.foreign('userId').references('id').inTable(userTable);

    table.unique(['userId', 'productId']);

    table.decimal('quantity').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
