// import SequelizeTeam from 'src/database/models/SequelizeTeam';
// import { NewEntity } from 'src/Interfaces';
// import ITeam from 'src/Interfaces/Team/ITeam';
// import ITeamModel from 'src/Interfaces/Team/ITeamModel';

// export default class TeamModel implements ITeamModel {
//   private model = SequelizeTeam;

//   async(data: NewEntity<ITeam>): Promise<ITeam> {
//     const dbTeam = await this.model.create(data);

//     const { id, teamName }: ITeam = dbTeam;
//     return { id, teamName };
//   }
// }
