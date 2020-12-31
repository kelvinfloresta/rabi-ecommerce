import { KnexFactory } from 'src/frameworks/database/knex/knex-factory.frameworks';
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
  order = 'orders',
  cart = 'cart_items',
}

const allTables = Object.values(TableName);
export async function cleanDatabase() {
  assertIsNotProduction();
  const promises = allTables.map((tableName) => db.raw(`TRUNCATE ${tableName} CASCADE`));
  await Promise.all(promises);
}
