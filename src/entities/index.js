const Sequelize = require('sequelize');
const {
  envs: {
    DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME, DATABASE_DIALECT,
  },
} = require('../config');

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: DATABASE_DIALECT,
  port: DATABASE_PORT,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Team = require('./team')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.UserTeams = require('./team-users')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;
