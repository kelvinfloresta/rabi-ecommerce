import * as Knex from 'knex';
import { TableName } from 'src/adapters/database/Database.adapter';
import { OrderStatus } from 'src/entities/enums/OrderStatus.enumt';
import { addTimestamp, PostgresUUIDV4 } from '../knex-migration.framework';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TableName.order, (table) => {
    table.uuid('id').primary().defaultTo(PostgresUUIDV4(knex));
    addTimestamp(table, knex, TableName.order);

    table.uuid('companyId').notNullable();
    table.foreign('companyId').references('id').inTable(TableName.company);

    table.uuid('userId').nullable();
    table.foreign('userId').references('id').inTable(TableName.user);

    table.enum('status', Object.values(OrderStatus)).nullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TableName.order);
}
