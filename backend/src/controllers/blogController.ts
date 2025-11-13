import { Request, Response, NextFunction } from 'express';
import { blogService } from '../services/blogService';

export const blogController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit } = req.query;
      const posts = await blogService.list(limit ? Number(limit) : undefined);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  },

  getBySlug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const post = await blogService.getBySlug(slug);
      res.json(post);
    } catch (error) {
      next(error);
    }
  },
};

