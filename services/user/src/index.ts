import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

import { Application } from './app';

dotenv.config();

createConnection().then(async () => {
  const application: Application = new Application();
  application.startServer();
});
