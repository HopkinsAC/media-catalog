export interface IRepository<T> {
  createOne(obj: T): Promise<void>;
  findAll(): Promise<T[]>;
  findOne(objId: string): Promise<T>;
}
