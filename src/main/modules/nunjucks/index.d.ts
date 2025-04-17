import { Application } from 'express';

export class Nunjucks {
  constructor(developmentMode: boolean);
  enableFor(app: Application): void;
}
