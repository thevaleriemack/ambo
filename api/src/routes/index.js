import assetsRouter from './assets';
import compoundRouter from './compound';

export default (app) => {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Ambo API Documentation' });
  });
  app.use('/assets', assetsRouter);
  app.use('/compound', compoundRouter);
}
