export interface IPatchGateway<Entity, Id = string> {
  patch(id: Id, input: Partial<Omit<Entity, 'id'>>): Promise<void>;
}

export interface ISaveGateway<Entity> {
  save(input: Entity): Promise<void>;
}

export interface IDeleteGateway<Id = string> {
  delete(id: Id): Promise<boolean>;
}

export interface ILogicDeleteGateway<Id = string> {
  logicDelete(id: Id): Promise<boolean>;
}

export interface IGetGateway<Entity, Id = string> {
  get(id: Id): Promise<Entity>;
}
