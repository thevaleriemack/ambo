import { Router } from 'express';

import {
  getAllAssetsData,
  getAbi,
  getImages,
  getPrice,
  getPrices
} from '../controllers/assets';

const router = Router();

router.get('/', [getAllAssetsData]);
router.get('/images', [getImages]);
router.get('/prices', [getPrices]);
router.get('/:ticker/abi/', [getAbi]);
router.get('/:ticker/price/:currency', [getPrice]);

export default router;
