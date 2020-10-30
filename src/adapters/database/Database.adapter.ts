import { KnexFactory } from 'src/frameworks/database/knex/knex.frameworks';
import { assertIsNotProduction } from 'src/config';

export const db = new KnexFactory().connect();

export async function closeDatabase() {
  await db.destroy();
}

export enum TableName {
  user = 'users',
  product = 'products',
  company = 'companies',
  category = 'categories',
  cart = 'cart_items',
}

export async function truncateTable(tableName: TableName) {
  assertIsNotProduction();
  await db.raw(`TRUNCATE ${tableName} CASCADE`);
}
