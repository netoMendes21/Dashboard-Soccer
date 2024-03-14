import ITeam from '../Team/ITeam';

export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: ITeam,
  awayTeam?: ITeam,
}
