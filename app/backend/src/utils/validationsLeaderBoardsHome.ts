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
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length * 3;
    const draw = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

    return victory + draw;
  }

  async teamsAndMatches() {
    const teams = await this.modelTeam.findAll();
    const teamData = teams.map((team) => team.dataValues);
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const matchesData = matches.map((match) => match.dataValues);
    return { teamData, matchesData };
  }

  static victories(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  static draws(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  static losses(teamMatches: IMatches[]) {
    return teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  static goalsFavor(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  static goalsOwn(teamMatches: IMatches[]) {
    return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  static goalsBalance(teamMatches: IMatches[]) {
    const balanceGoalsFavor = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const balanceGoalsOwn = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return balanceGoalsFavor - balanceGoalsOwn;
  }

  static efficiency(teamMatches: IMatches[]) {
    const totalPoints = ConstructorLeaderBoard.totalPoints(teamMatches);
    const totalGames = ConstructorLeaderBoard.totalGames(teamMatches);
    return (totalPoints / (totalGames * 3)) * 100;
  }

  async getHomeTeamsMatches() {
    const { teamData, matchesData } = await this.teamsAndMatches();
    const leaderBoard = teamData.map((team) => {
      const teamMatches = matchesData.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: ConstructorLeaderBoard.totalPoints(teamMatches),
        totalGames: ConstructorLeaderBoard.totalGames(teamMatches),
        totalVictories: ConstructorLeaderBoard.victories(teamMatches),
        totalDraws: ConstructorLeaderBoard.draws(teamMatches),
        totalLosses: ConstructorLeaderBoard.losses(teamMatches),
        goalsFavor: ConstructorLeaderBoard.goalsFavor(teamMatches),
        goalsOwn: ConstructorLeaderBoard.goalsOwn(teamMatches),
        goalsBalance: ConstructorLeaderBoard.goalsBalance(teamMatches),
        efficiency: ConstructorLeaderBoard.efficiency(teamMatches).toFixed(2),
      };
    });
    return leaderBoard;
  }
}
