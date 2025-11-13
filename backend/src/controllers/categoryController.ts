import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/categoryService';

export const categoryController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.list();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },
};

