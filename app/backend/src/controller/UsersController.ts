import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UsersController {
  constructor(private service: UserService = new UserService()) { }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return res.status(result.status).json(result.data);
  }
}
