import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

export default class SequelizeLogin extends Model<InferAttributes<SequelizeLogin>,
InferCreationAttributes<SequelizeLogin>> {
  declare email: CreationOptional<string>;
  declare password: string;
}

SequelizeLogin.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'login',
  timestamps: false,
});
