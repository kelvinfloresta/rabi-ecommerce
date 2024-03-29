import Knex from 'knex';
import { config } from 'src/config';
import * as pg from 'pg';

import { attachPaginate } from 'knex-paginate';
import knexFile from './knexfile';

export class KnexFactory {
  private config: Knex.Config;

  constructor() {
    KnexFactory.fixDecimalString();
    attachPaginate();
    this.config = KnexFactory.getConnectionConfig();
  }

  private static fixDecimalString(): void {
    const PG_DECIMAL_OID = 1700;
    pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  }

  private static getConnectionConfig() {
    const databaseConfig = knexFile[config.envName];
    if (!databaseConfig) {
      throw new Error(`Cannot find config with name "${config.envName}"`);
    }

    return databaseConfig;
  }

  connect() {
    return Knex(this.config);
  }
}
