import Knex from 'knex';
import config from 'src/config';
import * as pg from 'pg';

import knexFile from './knexfile';

export default class KnexFactory {
  private config: Knex.Config;

  constructor() {
    KnexFactory.fixDecimalString();
    this.config = KnexFactory.getConfig();
  }

  private static fixDecimalString(): void {
    const PG_DECIMAL_OID = 1700;
    pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  }

  private static getConfig() {
    const databaseConfig = knexFile[config.envName];
    if (!databaseConfig) {
      throw new Error('Missing database config');
    }
    return databaseConfig;
  }

  connect() {
    return Knex(this.config);
  }
}
