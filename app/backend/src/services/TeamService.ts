import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamService {
  private model = SequelizeTeam;

  async getAll() {
    const team = await this.model.findAll();
    return { status: 200, data: team };
  }
}
