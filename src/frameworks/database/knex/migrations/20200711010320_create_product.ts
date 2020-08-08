import * as Knex from 'knex';
import ProductGatewayKnexAdapter from 'src/adapters/gateways/Product/ProductKnexAdapter.gateway';
import CategoryGatewayKnexAdapter from 'src/adapters/gateways/Category/CategoryKnexAdapter.gateway';
import CompanyGatewayKnexAdapter from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { PostgresUUIDV4, addSoftDelete, addTimestamp } from '../knex-migration.framework';

const { tableName } = ProductGatewayKnexAdapter;
const { tableName: categoryTable } = CategoryGatewayKnexAdapter;
const { tableName: companyTable } = CompanyGatewayKnexAdapter;

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    addSoftDelete(table);
    addTimestamp(table, knex, tableName);
    table.decimal('price').notNullable();
    table.boolean('disabled').defaultTo(false).notNullable();
    table.text('description').nullable();

    table.uuid('categoryId').nullable();
    table.foreign('categoryId').references('id').inTable(categoryTable);

    table.uuid('companyId').notNullable();
    table.foreign('companyId').references('id').inTable(companyTable);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}
