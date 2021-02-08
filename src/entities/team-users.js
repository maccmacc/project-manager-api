// eslint-disable-next-line
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamUsers extends Model {
    static associate(models) {
      TeamUsers.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: true,
        },
        onDelete: 'cascade',
        hooks: true,
      });

      TeamUsers.belongsTo(models.Team, {
        foreignKey: {
          name: 'teamId',
          allowNull: true,
        },
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  TeamUsers.init({
    role: {
      type: DataTypes.STRING,

    },
  }, {
    timestamps: false,
    sequelize,
    modelName: 'TeamUsers',
  });

  return TeamUsers;
};
