import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class ConstructorLeaderBoard {
  constructor(
    private modelTeam = SequelizeTeam,
    private modelMatches = SequelizeMatches,
  ) {}

  static totalGames(teamMatches: IMatches[]) {
    return teamMatches.length;
  }

  static totalPoints(teamMatches: IMatches[]) {
    const victory = teamMatches
      .filter((match) => match.awayTeamGoals > match.homeTeamGoals).length * 3;
    const draw = teamMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;

    return victory + draw;
  }

  static victories(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
  }

  static draws(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
  }

  static losses(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
  }

  static goalsFavor(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  static goalsOwn(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  async getAwayTeamsMatches() {
    const teams = await this.modelTeam.findAll();
    const teamData = teams.map((team) => team.dataValues);
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const matchesData = matches.map((match) => match.dataValues);
    const leaderBoard = teamData.map((team) => {
      const teamMatches = matchesData.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: ConstructorLeaderBoard.totalPoints(teamMatches),
        totalGames: ConstructorLeaderBoard.totalGames(teamMatches),
        totalVictories: ConstructorLeaderBoard.victories(teamMatches),
        totalDraws: ConstructorLeaderBoard.draws(teamMatches),
        totalLosses: ConstructorLeaderBoard.losses(teamMatches),
        goalsFavor: ConstructorLeaderBoard.goalsFavor(teamMatches),
        goalsOwn: ConstructorLeaderBoard.goalsOwn(teamMatches),
      };
    });
    return leaderBoard;
  }
}
