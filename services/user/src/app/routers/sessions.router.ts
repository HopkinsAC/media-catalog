import express, { Request, Response, Router, NextFunction } from 'express';

import { SessionsController } from '#root/app/controllers';
import { IRepository, SessionsRepository, UsersRepository } from '#root/app/repositories';
import { Session, User } from '#root/app/data';

const router: Router = express.Router();
const usersRepository: IRepository<User> = new UsersRepository();
const sessionsRepository: IRepository<Session> = new SessionsRepository();
const controller: SessionsController = new SessionsController(usersRepository, sessionsRepository);

router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  await controller.createSession(request, response, next);
});

router.get('/:sessionId', async (request: Request, response: Response, next: NextFunction) => {
  await controller.getSession(request, response, next);
});

router.delete('/:sessionId', async (request: Request, response: Response, next: NextFunction) => {
  await controller.deleteSession(request, response, next);
});

export const sessionsRouter: Router = router;
