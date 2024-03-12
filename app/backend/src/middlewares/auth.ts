import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';

export default class authMiddleware {
  static async tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ message: 'Token não foi informado' });
    const token = authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token);
      res.locals = decoded;
      return next();
    } catch (err) {
      const customError = err as Error;
      return res.status(500).json(customError.message);
    }
  }
}
