import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { User } from '../data';

export class UsersRepository implements IRepository<User> {
  public async createOne(obj: User): Promise<any> {
    const repository: Repository<User> = getRepository(User);

    return repository.createQueryBuilder().insert().into(User).values([obj]).execute();
  }

  public async findAll(): Promise<User[]> {
    const repository: Repository<User> = getRepository(User);
    return repository.find();
  }

  public async findOne(objId: string): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const user = repository.findOne({ userName: objId });

    return <User>(<unknown>user);
  }
}
