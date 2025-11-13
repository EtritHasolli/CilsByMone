import { Router } from 'express';
import { productController } from '../controllers/productController';

const router = Router();

router.get('/', productController.list);
router.get('/:slug', productController.getBySlug);
router.get('/:productId/related', productController.related);

export { router as productRoutes };

