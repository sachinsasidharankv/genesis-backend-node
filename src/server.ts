import express from 'express';
import cors  = require("cors");
import { globalRouter } from './route';
import { userRouter } from './user/route';
import { healthRouter } from './health/route';
import { appDataSource } from './data-source';

export class Server {
  private readonly port: string | number;
  private readonly server: express.Application;

  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
  }

  public initMiddleWares() {
    this.server.use(express.json());
    this.server.use(cors());

    return this;
}
  public initRoutes() {
    this.server.use('/api', globalRouter);
    this.server.use('/health', healthRouter);
    this.server.use('/user', userRouter);
    return this;
  }

  async start() {
    await appDataSource.initialize();
    // await appDataSource.synchronize(true);
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

