import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.list);

export { router as categoryRoutes };

