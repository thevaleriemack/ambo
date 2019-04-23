import { Router } from 'express';

import {
  getAllAssetsData,
  getAbi,
  getImages,
  getPrice,
  getPrices
} from '../controllers/assets';
import cache from '../middleware/cache';

const router = Router();

router.get('/', [getAllAssetsData]);
router.get('/images', [cache(60*60*24*14), getImages]);
router.get('/prices', [getPrices]);
router.get('/:ticker/abi/', [getAbi]);
router.get('/:ticker/price/:currency', [getPrice]);

export default router;
