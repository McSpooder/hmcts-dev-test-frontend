import * as path from 'path';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { glob } from 'glob';
import favicon from 'serve-favicon';

import { HTTPError } from './HttpError';
import { Nunjucks } from './modules/nunjucks';

const { setupDev } = require('./development');
const env = process.env.NODE_ENV ?? 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

new Nunjucks(developmentMode).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

const routeFiles = glob.sync(path.join(__dirname, 'routes/**/*.+(ts|js)'));

routeFiles.forEach(filename => {
  console.log('Requiring route:', filename);
  const route = require(filename);

  if (typeof route === 'function') {
    route(app); // CommonJS style
  } else if (typeof route.default === 'function') {
    route.default(app); // ESModule/TypeScript style
  } else {
    console.warn('Route file does not export a function:', filename);
  }
});

setupDev(app, developmentMode);

// error handler
app.use((err: HTTPError, req: express.Request, res: express.Response) => {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
