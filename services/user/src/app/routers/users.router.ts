import express, { Request, Response, Router, NextFunction } from 'express';
import { UsersController } from '../controllers';

import { IRepository, UsersRepository } from '#root/app/repositories';
import { User } from '#root/app/data';

const router: Router = express.Router();
const usersRepository: IRepository<User> = new UsersRepository();
const controller: UsersController = new UsersController(usersRepository);

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  await controller.getAllUsers(request, response, next);
});

export const usersRouter: Router = router;
