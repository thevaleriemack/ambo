import { Router } from 'express';

import AssetsController from '../controllers/assets';

const router = Router();

router.get('/', [
  AssetsController.getAllAssetsData
]);
router.get('/prices', [
  AssetsController.getPrices
]);
router.get('/:ticker/price/:currency', [
  AssetsController.getPrice
]);

export default router;
