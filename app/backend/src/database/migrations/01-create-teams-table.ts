import { DataTypes, QueryInterface } from "sequelize";

export default class TeamTable {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable("teams", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("teams");
  };
}