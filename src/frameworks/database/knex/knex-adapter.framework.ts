import db from 'src/adapters/database/Database.adapter';

export default abstract class KnexInstance {
  private db = db;

  get instance() {
    return this.db(this.tableName);
  }

  abstract tableName: string;
}
