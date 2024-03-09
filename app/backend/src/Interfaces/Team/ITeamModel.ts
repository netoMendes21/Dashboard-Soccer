import Team from './ITeam';

export default interface ITeamModel {
  createTeam(data: Partial<Team>): Promise<Team>;
}
