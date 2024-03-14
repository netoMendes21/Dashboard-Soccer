import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchesController {
  constructor(private service: MatchService = new MatchService()) { }

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const matches = await this.service.getAllMatches();
    return res.status(200).json(matches);
  }
}
