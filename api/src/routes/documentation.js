import { Router } from 'express';

const router = Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ambo API Documentation' });
});

export default router;
