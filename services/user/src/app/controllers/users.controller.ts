import dayjs from 'dayjs';
import omit from 'lodash.omit';

import { Request, Response, NextFunction } from 'express';

import { IRepository } from '#root/app/repositories';
import { User } from '#root/app/data';
import { generateUUID, hashPassword } from '#root/app/services';

export class UsersController {
  private readonly _repository: IRepository<User>;

  constructor(repository: IRepository<User>) {
    this._repository = repository;
  }

  public async createUser(request: Request, response: Response, next: NextFunction): Promise<any> {
    if (!request.body.username || !request.body.firstname || !request.body.lastname || !request.body.password) {
      return next(new Error('invalid body'));
    }

    try {
      const newUser = {
        id: generateUUID(),
        userName: request.body.username,
        firstName: request.body.firstname,
        lastName: request.body.lastname,
        passwordHash: hashPassword(request.body.password),
        createdAt: dayjs().toISOString(),
      };

      await this._repository.createOne(newUser);

      return response.json(omit(newUser, ['passwordHash']));
    } catch (err) {
      return next(err);
    }
  }

  public async getAllUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this._repository
      .findAll()
      .then((users) => response.status(200).send(users))
      .catch((error) => response.status(500).send({ error: error }));
  }
}
