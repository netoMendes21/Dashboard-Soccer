import { DataTypes, Model, QueryInterface } from "sequelize";
import ILogin from "../../Interfaces/Login/Login";

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<ILogin>>("login", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.dropTable('login');
  },
};