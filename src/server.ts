import express from 'express';
import { globalRouter } from './route';
import { healthRouter } from './health/route';

export class Server {
  private readonly port: string | number;
  private readonly server: express.Application;

  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
  }

  public initMiddleWares() {
    this.server.use(express.json());
    return this;
  }

  public initRoutes() {
    this.server.use('/api', globalRouter);
    this.server.use('/health', healthRouter);
    return this;
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

