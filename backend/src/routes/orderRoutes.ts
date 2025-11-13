import { Router } from 'express';
import { orderController } from '../controllers/orderController';

const router = Router();

router.post('/', orderController.create);

export { router as orderRoutes };

