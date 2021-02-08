// eslint-disable-next-line
'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Team, {
        foreignKey: {
          name: 'projectId',
          allowNull: false,
        },
        as: 'teams',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Project',
  });

  return Project;
};
