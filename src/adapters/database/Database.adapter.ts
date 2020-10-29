import { KnexFactory } from 'src/frameworks/database/knex/knex.frameworks';
import { assertIsNotProduction } from 'src/config';

export const db = new KnexFactory().connect();

export async function closeDatabase() {
  await db.destroy();
}

export async function truncateTable(tableName: string) {
  assertIsNotProduction();
  await db.raw(`TRUNCATE ${tableName} CASCADE`);
}
