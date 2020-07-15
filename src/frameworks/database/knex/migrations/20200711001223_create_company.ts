import Knex from 'knex';
import CompanyGatewayKnexAdapter from 'src/adapters/gateways/Cart/CartKnexAdapter.gateway';
import DocumentType from 'src/entities/enums/DocumentType.enum';
import { PostgresUUIDV4, addTimestamp } from '../knex-migration.framework';

const { tableName } = CompanyGatewayKnexAdapter;

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    addTimestamp(table, knex, tableName);
    table.string('documentNumber').notNullable();
    table.enum('documentType', [DocumentType.CPF, DocumentType.CNPJ]);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}
