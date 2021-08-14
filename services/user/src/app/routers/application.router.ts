import express, { Router } from 'express';
import { usersRouter } from './users.router';
import { sessionsRouter } from './sessions.router';

const router: Router = express.Router();
router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export const applicationRouter: Router = router;
