export interface IRepository<T> {
  createOne(one: T): Promise<void>;
  findAll(): Promise<T[]>;
}
