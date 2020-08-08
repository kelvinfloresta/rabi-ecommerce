import Knex from 'knex';
import CategoryGatewayKnexAdapter from 'src/adapters/gateways/Category/CategoryKnexAdapter.gateway';
import CompanyGatewayKnexAdapter from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { PostgresUUIDV4 } from '../knex-migration.framework';

const { tableName } = CategoryGatewayKnexAdapter;
const { tableName: companyTable } = CompanyGatewayKnexAdapter;

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    table.string('description').nullable();
    table.unique(['name', 'companyId']);

    table.uuid('companyId').notNullable();
    table.foreign('companyId').references('id').inTable(companyTable);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}
