import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class ConstructorLeaderBoardAway {
  constructor(
    private modelTeam = SequelizeTeam,
    private modelMatches = SequelizeMatches,
  ) {}

  static totalGames(teamMatches: IMatches[]) {
    return teamMatches.length;
  }

  async teamsAndMatches() {
    const teams = await this.modelTeam.findAll();
    const teamData = teams.map((team) => team.dataValues);
    const matches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const matchesData = matches.map((match) => match.dataValues);
    return { teamData, matchesData };
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

  static goalsBalance(teamMatches: IMatches[]) {
    const balanceGoalsFavor = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    const balanceGoalsOwn = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return balanceGoalsFavor - balanceGoalsOwn;
  }

  static efficiency(teamMatches: IMatches[]) {
    const totalPoints = ConstructorLeaderBoardAway.totalPoints(teamMatches);
    const totalGames = ConstructorLeaderBoardAway.totalGames(teamMatches);
    return (totalPoints / (totalGames * 3)) * 100;
  }

  async getAwayTeamsMatches() {
    const { teamData, matchesData } = await this.teamsAndMatches();
    const leaderBoard = teamData.map((team) => {
      const teamMatches = matchesData.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        totalPoints: ConstructorLeaderBoardAway.totalPoints(teamMatches),
        totalGames: ConstructorLeaderBoardAway.totalGames(teamMatches),
        totalVictories: ConstructorLeaderBoardAway.victories(teamMatches),
        totalDraws: ConstructorLeaderBoardAway.draws(teamMatches),
        totalLosses: ConstructorLeaderBoardAway.losses(teamMatches),
        goalsFavor: ConstructorLeaderBoardAway.goalsFavor(teamMatches),
        goalsOwn: ConstructorLeaderBoardAway.goalsOwn(teamMatches),
        goalsBalance: ConstructorLeaderBoardAway.goalsFavor(teamMatches),
        efficiency: ConstructorLeaderBoardAway.efficiency(teamMatches).toFixed(2),
      };
    });
    return leaderBoard;
  }
}
