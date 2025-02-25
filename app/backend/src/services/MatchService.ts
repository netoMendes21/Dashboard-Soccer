import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchService {
  private model = SequelizeMatches;

  async getAllMatches() {
    const matches = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }] });
    console.log(matches.map((match) => match.dataValues));
    return matches;
  }

  async getMatchById(id: number) {
    const match = await this.model.findByPk(id);
    return match;
  }

  async updateMatches(matchId: IMatches) {
    const matches = await this.model.update(matchId, { where: { id: matchId.id } });
    return matches;
  }

  async createMatch(match: IMatches) {
    const newMatch = await this.model.create(match);
    if (!newMatch) return null;
    return newMatch;
  }
}
