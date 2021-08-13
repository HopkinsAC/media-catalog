import express, { Express } from 'express';
import cors from 'cors';

import { applicationRouter } from '#root/app/routers';

export class Application {
  _server: Express;

  constructor() {
    this._server = express();
    this._server.set('host', process.env.HOST || 'localhost');
    this._server.set('port', process.env.PORT || 3001);

    this._server.use(express.json());
    this._server.use(express.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(applicationRouter);
  }

  public async startServer(): Promise<void> {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');

    this._server.listen(port, host, () => {
      console.log(`Server started at http//:${host}:${port}`);
    });
  }
}
