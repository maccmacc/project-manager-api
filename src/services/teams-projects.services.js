const { Team } = require('../entities');
const { getProjectById } = require('./projects.services');
const { getTeamById } = require('./teams.services');

const addProjectToTeam = async (id, name, description, projectId) => {
  await getProjectById(projectId);
  await getTeamById(id);

  try {
    await Team.update({ projectId }, { where: { id } });
  } catch (error) {
    console.log('err');
  }
};

const removeProjectFromTeam = async (id, projectId) => {
  const projectTeam = await Team.findOne({ where: { id, projectId } });

  if (!projectTeam) {
    throw new Error('Project does not exist in team');
  }

  await Team.update({ projectId: null }, { where: { projectId, id } });
};

module.exports = { addProjectToTeam, removeProjectFromTeam };
