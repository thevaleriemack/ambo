import { Router } from 'express';

import { getBalance } from '../controllers/account';

const router = Router();

router.get('/:account/:ticker', [getBalance]);

export default router;
