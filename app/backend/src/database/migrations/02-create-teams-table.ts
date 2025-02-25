import { DataTypes, Model, QueryInterface } from "sequelize";
import ITeam from "../../Interfaces/Team/ITeam";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>("teams", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "team_name",
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("teams");
  },
}