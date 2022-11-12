import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  morgan('dev')(req, res, next);
  next();
};
