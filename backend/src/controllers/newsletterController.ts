import { Request, Response, NextFunction } from 'express';
import { newsletterService } from '../services/newsletterService';

export const newsletterController = {
  subscribe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await newsletterService.subscribe(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

