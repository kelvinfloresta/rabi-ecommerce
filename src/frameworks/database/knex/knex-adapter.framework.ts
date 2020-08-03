import db from 'src/adapters/database/Database.adapter';
import { IPaginationParams } from 'src/usecases/IPaginate';

export default class KnexRepositoryHelper<Entity, Id extends string | number = string> {
  private knex = db;

  constructor(private tableName: string) {}

  get instance() {
    return this.knex(this.tableName);
  }

  async getById(id: Id): Promise<Entity> {
    return this.instance.where({ id }).first();
  }

  async getByFilter(filter: Partial<Entity>): Promise<Entity> {
    return this.instance.where(filter).first();
  }

  async paginateByFilter(filter: Partial<Entity>, paginate: IPaginationParams) {
    return this.instance.where(filter).paginate<Entity[]>(paginate);
  }

  async listByfilter(input: Partial<Entity>): Promise<Entity[]> {
    return this.instance.where(input);
  }

  async save<Input extends Partial<Entity>>(input: Input): Promise<Id> {
    const [result] = await this.instance.insert(input).returning('id');
    return result;
  }

  async updateById(id: Id, input: Partial<Entity>): Promise<number> {
    return this.instance.update(input).where({ id });
  }

  async updateByFilter(filter: Partial<Entity>, input: Partial<Entity>): Promise<number> {
    return this.instance.update(input).where(filter);
  }

  async logicDelete(id: Id): Promise<boolean> {
    const result = await this.instance.where({ id }).update({ deletedAt: new Date() });
    return result > 0;
  }
}
