import express from 'express';
import { DataSource } from 'typeorm';

import { User } from './user/entity';
import { globalRouter } from './route';
import { healthRouter } from './health/route';

export const appDataSource = new DataSource({
  port: 5432,
  database: "mars",
  type: "postgres",
  host: "localhost",
  username: "loc_system",
  password: "password1234",
  entities: [User],
  synchronize: true
});
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

  async start() {
    await appDataSource.initialize();
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

