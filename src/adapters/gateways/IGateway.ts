export interface IPatchGateway<Entity, Id = string> {
  patch(id: Id, input: Partial<Omit<Entity, 'id'>>): Promise<Entity>
}

export interface ISaveGateway<Entity> {
  save(input: Entity): Promise<Entity>
}

export interface IDeleteGateway<Id = string> {
  delete(id: Id): Promise<boolean>
}

export interface IGetGateway<Entity, Id = string> {
  get(id: Id): Promise<Entity>
}
