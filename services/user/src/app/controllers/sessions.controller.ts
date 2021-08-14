import config from 'config';
import dayjs from 'dayjs';

import { Request, Response, NextFunction } from 'express';

import { IRepository, UsersRepository, SessionsRepository } from '#root/app/repositories';
import { Session, User } from '#root/app/data';
import { generateUUID } from '#root/app/services';

import comparePasswordSync from '#root/app/services/comparePasswordSync';

const USER_SESSION_EXPIRY_HOURS = <number>config.get('USER_SESSION_EXPIRY_HOURS');

export class SessionsController {
  private readonly _users: IRepository<User>;
  private readonly _sessions: IRepository<Session>;

  constructor(usersRepo: IRepository<User>, sessionsRepo: IRepository<Session>) {
    this._users = usersRepo;
    this._sessions = sessionsRepo;
  }

  public async createSession(request: Request, response: Response, next: NextFunction): Promise<any> {
    if (!request.body.username || !request.body.password) {
      return next(new Error('Invalid Body'));
    }

    try {
      const user = await this._users.findOneWithFieldSelection(request.body.username, {
        select: ['id', 'passwordHash'],
      });
      if (!user) {
        return next(new Error('Invalid user ID'));
      }

      if (!comparePasswordSync(request.body.password, user.passwordHash)) {
        return next(new Error('Invalid password'));
      }

      const expiresAt = dayjs().add(USER_SESSION_EXPIRY_HOURS, 'hour').toISOString();
      const sessionToken = generateUUID();

      const newSession = {
        id: sessionToken,
        userId: user.id,
        createdAt: dayjs().toISOString(),
        expiresAt: expiresAt,
      };

      await this._sessions.createOne(newSession);

      return response.json(newSession);
    } catch (err) {
      return next(err);
    }
  }

  public async getSession(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const session = await this._sessions.findOne(request.params.sessionId);
      if (!session) {
        return next(new Error('Invalid session ID'));
      }

      return response.json(session);
    } catch (err) {
      return next(err);
    }
  }

  public async deleteSession(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const session = await this._sessions.findOne(request.params.sessionId);
      if (!session) {
        return next(new Error('Invalid session ID'));
      }

      await this._sessions.removeOne(session);

      return response.end();
    } catch (err) {
      return next(err);
    }
  }
}
