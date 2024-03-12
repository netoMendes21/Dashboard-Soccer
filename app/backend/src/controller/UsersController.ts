import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UsersController {
  private service = new UserService();

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.service.login(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.status(200).json(user);
  }
}
