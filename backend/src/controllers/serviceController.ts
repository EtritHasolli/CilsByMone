import { Request, Response, NextFunction } from 'express';
import { serviceOfferingsService } from '../services/serviceOfferings';

export const serviceController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const services = await serviceOfferingsService.list();
      res.json(services);
    } catch (error) {
      next(error);
    }
  },
};

