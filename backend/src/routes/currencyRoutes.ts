import { Router } from 'express';
import { currencyController } from '../controllers/currencyController';

const router = Router();

router.get('/rates', currencyController.rates);

export { router as currencyRoutes };

