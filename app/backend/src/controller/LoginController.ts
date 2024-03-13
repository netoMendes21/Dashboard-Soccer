import { Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private service: LoginService = new LoginService()) { }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return res.status(result.status).json(result.data);
  }

  public async getByRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    const decoded = verifyToken(token as string);
    if (!decoded) {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }
    const result = await this.service.getByRole(decoded.id);
    return res.status(200).json(result);
  }
}
