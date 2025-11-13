import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orderService';

export const orderController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await orderService.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
};

