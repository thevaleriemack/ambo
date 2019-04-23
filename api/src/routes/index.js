import accountRouter from './account';
import assetsRouter from './assets';
import compoundRouter from './compound';

export default (app) => {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Dephi Odds API Documentation' });
  });
  app.use('/account', accountRouter);
  app.use('/assets', assetsRouter);
  app.use('/compound', compoundRouter);
}
