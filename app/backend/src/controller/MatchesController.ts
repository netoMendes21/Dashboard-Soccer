import { Request, Response } from 'express';
import { existTeam, validationMatches } from '../utils/validatorMatches';
import { IMatches } from '../Interfaces/matches/IMatches';
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

  public async matchFinish(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this.service.getMatchById(Number(id));
    const matchesFinish = {
      ...match?.dataValues,
      inProgress: false,
    } as IMatches;
    const matchesUptaded = await this.service.updateMatches(matchesFinish);
    if (!matchesUptaded) {
      return res.status(404).json({ message: 'Match not found' });
    }
    if (matchesUptaded) return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.service.getMatchById(Number(id));
    const matchGoals = {
      ...match?.dataValues,
      homeTeamGoals,
      awayTeamGoals,
    } as IMatches;
    if (matchGoals) {
      const matchesUptaded = await this.service.updateMatches(matchGoals);
      if (!matchesUptaded) {
        return res.status(404).json({ message: 'Match not found' });
      }
    } return res.status(200).json(matchGoals);
  }

  public async insertMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const homeTeam = newMatch.homeTeamId;
    const awayTeam = newMatch.awayTeamId;
    const validateTeamsEqual = validationMatches(homeTeam, awayTeam);
    if (validateTeamsEqual) {
      return res.status(422).json(validateTeamsEqual);
    }
    const teamsNotExist = await existTeam(homeTeam, awayTeam);
    if (!teamsNotExist) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const matchCreated = await this.service.createMatch(newMatch);
    return res.status(201).json(matchCreated);
  }
}
