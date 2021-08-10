import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { User } from '../data';

export class UsersRepository implements IRepository<User> {
  public async createOne(one: User): Promise<any> {
    const repository: Repository<User> = getRepository(User);

    return repository.createQueryBuilder().insert().into(User).values([one]).execute();
  }

  public async findAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);
    return repository.find();
  }
}
