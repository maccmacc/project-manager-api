// eslint-disable-next-line
'use strict';
const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserTeams, {
        foreignKey: {
          name: 'userId',
          allowNull: true,
        },
        hooks: true,
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {

    sequelize,
    modelName: 'User',
  });

  return User;
};
