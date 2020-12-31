import { db } from 'src/adapters/database/Database.adapter';
import { IPaginationParams } from 'src/usecases/IPaginate';

export class KnexRepositoryHelper<Entity, Id extends string | number = string> {
  private knex = db;

  constructor(private tableName: string) {}

  get instance() {
    return this.knex(this.tableName);
  }

  async getById(id: Id): Promise<Entity | undefined> {
    return this.instance.where({ id }).first();
  }

  async getByFilter(filter: Partial<Entity>): Promise<Entity | undefined> {
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

  async updateByFilter(filter: Partial<Entity>, input: Partial<Entity>): Promise<boolean> {
    const result = await this.instance.update(input).where(filter);
    return result > 0;
  }

  async logicDelete(filter: Partial<Entity>): Promise<boolean> {
    const result = await this.instance
      .where(filter)
      .where({ deletedAt: null })
      .update({ deletedAt: new Date() });

    return result > 0;
  }

  async hardDelete(filter: Partial<Entity>): Promise<boolean> {
    const result = await this.instance.where(filter).del();
    return result > 0;
  }
}
