// import SequelizeTeam from '../database/models/SequelizeTeam';
import ILeaderBoard from '../Interfaces/leaderBoard/LeaderBoard';
import ConstructorLeaderBoard from '../utils/validationsLeaderBoardsHome';

export function orderByPoints(leaderBoarder: ILeaderBoard[]) {
  return leaderBoarder.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
}

export default class LeaderBoardService {
  private model: ConstructorLeaderBoard = new ConstructorLeaderBoard();

  async leaderBoardHome() {
    const matches = await this.model.getHomeTeamsMatches();
    const orderBoard = orderByPoints(matches);
    return orderBoard;
  }
}
