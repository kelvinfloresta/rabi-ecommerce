import * as Knex from 'knex';
import env from 'src/config';
import * as pg from 'pg';

import knexFile = require('./knexfile');

export default class KnexFactory {
  private config;

  constructor() {
    KnexFactory.fixDecimalString();
    this.config = KnexFactory.getConfig();
  }

  private static fixDecimalString(): void {
    const PG_DECIMAL_OID = 1700;
    pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  }

  private static getConfig() {
    const config = knexFile[env.envName];
    if (!config) {
      throw new Error('Missing database config');
    }
    return config;
  }

  connect() {
    return Knex(this.config);
  }
}
