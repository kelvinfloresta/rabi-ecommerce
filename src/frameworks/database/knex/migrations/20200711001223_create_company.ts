import Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { DocumentType } from 'src/entities/enums/DocumentType.enum';
import { PostgresUUIDV4, addTimestamp } from '../knex-migration.framework';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TableName.company, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    table.string('name').notNullable();
    addTimestamp(table, knex, TableName.company);
    table.string('documentNumber').nullable();
    table.enum('documentType', [DocumentType.CPF, DocumentType.CNPJ]).nullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TableName.company);
}
