import { Router } from 'express';
import { productRoutes } from './productRoutes';
import { categoryRoutes } from './categoryRoutes';
import { blogRoutes } from './blogRoutes';
import { newsletterRoutes } from './newsletterRoutes';
import { serviceRoutes } from './serviceRoutes';
import { orderRoutes } from './orderRoutes';
import { currencyRoutes } from './currencyRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/blog-posts', blogRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/services', serviceRoutes);
router.use('/orders', orderRoutes);
router.use('/currency', currencyRoutes);

export { router as apiRoutes };

