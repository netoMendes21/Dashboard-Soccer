import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderController {
  private leaderBoardService = new LeaderBoardService();

  async ResponseLeaderBoardHome(_req: Request, res: Response) {
    const matches = await this.leaderBoardService.leaderBoardHome();
    return res.status(200).json(matches);
  }
}
