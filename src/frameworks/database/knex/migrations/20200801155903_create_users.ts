import Knex from 'knex';
import UserGatewayKnexAdapter from 'src/adapters/gateways/User/UserKnexAdapter.gateway';
import DocumentType from 'src/entities/enums/DocumentType.enum';
import CompanyGatewayKnexAdapter from 'src/adapters/gateways/Company/CompanyKnexAdapter.gateway';
import { PostgresUUIDV4, addTimestamp, addSoftDelete } from '../knex-migration.framework';

const { tableName } = UserGatewayKnexAdapter;
const { tableName: companyTable } = CompanyGatewayKnexAdapter;

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    addSoftDelete(table);
    addTimestamp(table, knex, tableName);
    table.string('documentNumber').nullable();
    table.enum('documentType', [DocumentType.CPF, DocumentType.CNPJ]).nullable();

    table.uuid('companyId').nullable();

    table.foreign('companyId').references('id').inTable(companyTable);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
