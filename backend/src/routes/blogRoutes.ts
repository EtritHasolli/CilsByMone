import { Router } from 'express';
import { blogController } from '../controllers/blogController';

const router = Router();

router.get('/', blogController.list);
router.get('/:slug', blogController.getBySlug);

export { router as blogRoutes };

