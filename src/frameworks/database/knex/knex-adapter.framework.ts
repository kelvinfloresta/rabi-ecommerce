import db from 'src/adapters/database/Database.adapter';

export default abstract class KnexBaseGateway {
  private db = db;

  abstract tableName: string;

  get instance() {
    return this.db(this.tableName);
  }

  static makeGet<T>() {
    return async function get(id: string): Promise<T> {
      return this.instance.where({ id }).first();
    };
  }

  static makeSave<T>(returning: '*' | Array<keyof T>) {
    return async function save(input: T): Promise<T> {
      const [result] = await this.instance.insert(input).returning(returning);
      return result;
    };
  }

  static makePatch<T>(returning: '*' | Array<keyof T>) {
    return async function patch(id: string, input: Partial<Omit<T, 'id'>>): Promise<T> {
      const [result] = await this.instance.update(input).where({ id }).returning(returning);
      return result;
    };
  }

  static makeLogicDelete() {
    return async function logicDelete(id: string): Promise<boolean> {
      const result = await this.instance.where({ id }).update({ deletedAt: new Date() });
      return result > 0;
    };
  }
}
