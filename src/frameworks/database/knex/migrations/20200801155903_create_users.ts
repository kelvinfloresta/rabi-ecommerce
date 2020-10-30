import Knex from 'knex';
import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { TableName } from 'src/adapters/database/Database.adapter';
import { PostgresUUIDV4, addTimestamp, addSoftDelete } from '../knex-migration.framework';

export async function up(knex: Knex) {
  return knex.schema.createTable(TableName.user, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    addSoftDelete(table);
    addTimestamp(table, knex, TableName.user);
    table.string('documentNumber').nullable();
    table.enum('documentType', [DocumentType.CPF, DocumentType.CNPJ]).nullable();

    table.uuid('companyId').nullable();

    table.foreign('companyId').references('id').inTable(TableName.company);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableName.user);
}
