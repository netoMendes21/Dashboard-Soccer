import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchesController {
  constructor(private service: MatchService = new MatchService()) { }

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { inProgress } = _req.query;
    const matches = await this.service.getAllMatches();
    if (inProgress === 'true') {
      const matchesInProgress = matches.filter((match) => match.inProgress === true);
      return res.status(200).json(matchesInProgress);
    } if (inProgress === 'false') {
      const matchesFinish = matches.filter((match) => match.inProgress === false);
      return res.status(200).json(matchesFinish);
    }
    return res.status(200).json(matches);
  }
}
