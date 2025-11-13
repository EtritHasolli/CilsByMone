import { Request, Response, NextFunction } from 'express';
import { currencyService } from '../services/currencyService';

export const currencyController = {
  rates: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { base } = req.query;
      const rates = await currencyService.fetchRates(
        typeof base === 'string' && ['USD', 'GBP', 'EUR'].includes(base) ? (base as 'USD' | 'GBP' | 'EUR') : 'USD'
      );
      res.json(rates);
    } catch (error) {
      next(error);
    }
  },
};

