import assetsRouter from './assets';
import documentationRouter from './documentation';

export default (app) => {
  app.use('/', documentationRouter);
  app.use('/assets', assetsRouter);
}
