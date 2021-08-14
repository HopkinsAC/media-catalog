import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Session } from '../data';

export class SessionsRepository implements IRepository<Session> {
  public async createOne(obj: Session): Promise<any> {
    const repository: Repository<Session> = getRepository(Session);

    return repository.createQueryBuilder().insert().into(Session).values([obj]).execute();
  }

  public async findAll(): Promise<Session[]> {
    const repository: Repository<Session> = getRepository(Session);

    return repository.find();
  }

  public async findOne(objId: string): Promise<Session> {
    const repository: Repository<Session> = getRepository(Session);
    const session = repository.findOne({ id: objId });

    return <Session>(<unknown>session);
  }
  public async findOneWithFieldSelection(objId: string, fields: any): Promise<Session> {
    const repository: Repository<Session> = getRepository(Session);
    const session = repository.findOne({ id: objId }, fields);

    return <Session>(<unknown>session);
  }

  public async removeOne(obj: Session): Promise<void> {
    const repository: Repository<Session> = getRepository(Session);

    await repository.remove(obj);
  }
}
