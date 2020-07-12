import db from 'src/adapters/database/Database.adapter';

export default abstract class KnexBaseGateway<T extends { id: string }> {
  private db = db;

  abstract tableName: string;

  get instance() {
    return this.db(this.tableName);
  }

  async get(id: string): Promise<T> {
    return this.instance.where({ id }).first();
  }

  async save(input: T): Promise<string> {
    const [result] = await this.instance.insert(input).returning('id');
    return result;
  }

  async patch(input: Partial<T>): Promise<void> {
    await this.instance.update(input).where({ id: input.id });
  }

  async logicDelete(id: string): Promise<boolean> {
    const result = await this.instance.where({ id }).update({ deletedAt: new Date() });
    return result > 0;
  }
}
