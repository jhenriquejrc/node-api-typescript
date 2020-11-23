import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { FetchForescastController } from './controller/forecast';
import { BeachesController } from '@src/controller/beaches';
import { Application } from 'express';
import * as database from '@src/database';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const fetchForescastController = new FetchForescastController();
    const beachesController = new BeachesController();
    this.addControllers([fetchForescastController, beachesController]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }
  public getApp(): Application {
    return this.app;
  }
}
