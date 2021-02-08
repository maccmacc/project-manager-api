const { UserTeams, User } = require('../entities');
const userService = require('./users.services');
const teamService = require('./teams.services');

const addUserToTeam = async (teamId, userId, role) => {
  console.log(userService, 5, teamService);
  return userService.getUserById(userId)
    .then(() => teamService.getTeamById(teamId))
    .then(() => UserTeams.create({
      role,
      userId,
      teamId,
    }));
};

const removeUserFromTeam = async (teamId, userId) => {
  const userTeam = await UserTeams.findOne({ where: { teamId, userId } });

  if (!userTeam) {
    throw new Error('User does not exist in team');
  }

  await UserTeams.destroy({ where: { userId, teamId } });
};

const getAllUsersFromTeam = async (teamId) => {
  const userTeams = await UserTeams.findAll({ where: { teamId } });
  // [1,2,3]
  const userIds = userTeams.map((userTeam) => userTeam.dataValues.userId);
  const users = await User.findAll({ where: { id: userIds } });
  return users;
};

module.exports = { addUserToTeam, removeUserFromTeam, getAllUsersFromTeam };
