import { Request, Response, NextFunction } from 'express';

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
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password too short' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    if (token.length === null) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
