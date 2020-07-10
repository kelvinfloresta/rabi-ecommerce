export interface IPatchGateway<T, Id = string> {
  patch(id: Id, input: Partial<Omit<T, 'id'>>): Promise<T>
}

export interface ISaveGateway<T> {
  save(input: T): Promise<T>
}

export interface IDeleteGateway<Id = string> {
  delete(id: Id): Promise<boolean>
}
