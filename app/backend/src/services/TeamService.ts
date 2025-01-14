import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamService {
  private model = SequelizeTeam;

  async getAll() {
    const team = await this.model.findAll();
    return team;
  }

  async getById(id: number) {
    const team = await this.model.findByPk(id);
    if (!team) {
      return null;
    }
    return team;
  }
}
