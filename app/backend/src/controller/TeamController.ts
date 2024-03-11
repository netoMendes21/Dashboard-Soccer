import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private service: TeamService = new TeamService()) {
    this.service = service;
  }

  async getAllTeams(_req: Request, res: Response) {
    const allTeams = await this.service.getAll();
    res.status(200).json(allTeams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));
    if (!team) {
      res.status(404).json({ message: 'Team not found' });
    } else {
      res.status(200).json(team);
    }
  }
}
