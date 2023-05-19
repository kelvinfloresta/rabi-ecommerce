import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.raw(`
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
   NEW."updatedAt"=now();
   RETURN NEW;
  END;
  $$ language 'plpgsql';
`);
}

export async function down(knex: Knex): Promise<any> {
  return knex.raw('DROP FUNCTION on_update_timestamp;');
}
