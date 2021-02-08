// eslint-disable-next-line
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.hasMany(models.UserTeams, {
        foreignKey: {
          name: 'teamId',
          allowNull: true,
        },
        hooks: true,
      });

      Team.belongsTo(models.Project, {
        foreignKey: {
          name: 'projectId',
          allowNull: true,
        },
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Team',
    timestamps: false,
  });
  return Team;
};
