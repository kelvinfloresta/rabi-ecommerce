import KnexFactory from 'src/frameworks/database/knex/knex.frameworks';

const db = new KnexFactory().connect();

export async function closeDatabase() {
  await db.destroy();
}

export default db;
