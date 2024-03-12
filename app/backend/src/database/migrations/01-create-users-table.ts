import { DataTypes, Model, QueryInterface } from "sequelize";
import ILogin from "../../Interfaces/Users/IUsers";

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<ILogin>>('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.dropTable('users');
  },
};