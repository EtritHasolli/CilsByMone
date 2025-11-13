import { Router } from 'express';
import { newsletterController } from '../controllers/newsletterController';

const router = Router();

router.post('/', newsletterController.subscribe);

export { router as newsletterRoutes };

