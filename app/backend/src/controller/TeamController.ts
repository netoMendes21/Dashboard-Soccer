import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private service: TeamService = new TeamService()) {
    this.service = service;
  }

  async getAllTeams(_req: Request, res: Response) {
    const AllTeams = await this.service.getAll();
    res.status(200).json(AllTeams);
  }
}
