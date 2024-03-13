import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private service: LoginService = new LoginService()) { }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return res.status(result.status).json(result.data);
  }
}
