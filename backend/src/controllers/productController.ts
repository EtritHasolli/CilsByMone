import { Request, Response, NextFunction } from 'express';
import { productService, ProductQueryParams } from '../services/productService';

export const productController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, category, search, featured, sort, length, curl, volume, priceMin, priceMax } =
        req.query;

      const response = await productService.list({
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        categorySlug: typeof category === 'string' ? category : undefined,
        search: typeof search === 'string' ? search : undefined,
        featured: typeof featured === 'string' ? featured === 'true' : undefined,
        sort:
          typeof sort === 'string' ? (sort as ProductQueryParams['sort']) : undefined,
        length: typeof length === 'string' ? length.split(',').map((v) => Number(v)) : undefined,
        curl: typeof curl === 'string' ? curl.split(',') : undefined,
        volume: typeof volume === 'string' ? volume.split(',') : undefined,
        priceMin: typeof priceMin === 'string' ? Number(priceMin) : undefined,
        priceMax: typeof priceMax === 'string' ? Number(priceMax) : undefined,
      });

      res.json(response);
    } catch (error) {
      next(error);
    }
  },

  getBySlug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const product = await productService.getBySlug(slug);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  related: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const { limit } = req.query;
      const products = await productService.getRelated(productId, limit ? Number(limit) : 6);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
};

