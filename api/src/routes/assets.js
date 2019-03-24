import { Router } from 'express';

import assets from '../compound/assets';

const router = Router();

router.get('/', function(req, res, next) {
  res.send(assets);
});

export default router;
