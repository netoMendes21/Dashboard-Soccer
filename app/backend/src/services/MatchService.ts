import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchService {
  private model = SequelizeMatches;

  async getAllMatches() {
    const matches = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }] });
    console.log(matches);
    return matches;
  }

  // async getMatchById(id: number) {
  //   const match = await this.model.findByPk(id);
  //   if (!match) {
  //     return null;
  //   }
  //   return match;
}
