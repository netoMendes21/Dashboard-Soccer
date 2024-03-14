import SequelizeTeam from '../database/models/SequelizeTeam';

export function validationMatches(homeTeam: string, awayTeam: string) {
  if (homeTeam === awayTeam) {
    return { message: 'It is not possible to create a match with two equal teams' };
  }
  return false;
}

export async function existTeam(homeTeamId: number, awayTeamId: number) {
  const teams = await Promise.all([SequelizeTeam
    .findByPk(homeTeamId), SequelizeTeam.findByPk(awayTeamId)]);
  if (teams.some((team) => !team)) {
    return { message: 'There is no team with such id!' };
  }
  return true;
}
