export interface IRepository<T> {
  createOne(obj: T): Promise<void>;
  findAll(): Promise<T[]>;
  findOne(objId: string): Promise<T>;
  findOneWithFieldSelection(objId: string, fields: any): Promise<T>;
  removeOne(obj: T): Promise<void>;
}
