const userService = require('./users.services');
const teamService = require('./teams.services');
const projectService = require('./projects.services');
const userTeamService = require('./team-users.services');
const teamProjectService = require('./teams-projects.services');

module.exports = {
  userService,
  teamService,
  projectService,
  userTeamService,
  teamProjectService,
};
