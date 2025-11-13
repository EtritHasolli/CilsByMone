import { Router } from 'express';
import { serviceController } from '../controllers/serviceController';

const router = Router();

router.get('/', serviceController.list);

export { router as serviceRoutes };

