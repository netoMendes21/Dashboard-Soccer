import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';

export default class UserMiddleware {
  static async validateUser(req: Request, res: Response, next: NextFunction) {
    const { username, role, email, password } = req.body;
    if (!username || !role || !email || !password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    next();
  }

  static async validatorLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
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
