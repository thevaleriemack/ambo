import { Router } from 'express';

import {
  accountData,
  marketData
} from '../controllers/compound';

const router = Router();

router.get('/account/:address', [accountData]);
router.get('/market/:asset', [marketData]);

export default router;
