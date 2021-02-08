const { Team } = require('../entities/index');

const getAllTeams = async () => Team.findAll();

const getTeamById = async (id) => {
  const team = await Team.findByPk(id);
  if (!team) {
    throw new Error(`Team with id ${id} is not found`);
  }

  return team;
};

const updateTeam = async (id, teamRaw) => {
  const {
    name, description,
  } = teamRaw;

  const team = await getTeamById(id);

  return team.update({
    ...team,
    name,
    description,
  });
};
const createTeam = async (teamRaw) => {
  const {
    name, description,
  } = teamRaw;

  try {
    return Team.create({
      name,
      description,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Team with this name already exist');
  }
};

const deleteTeam = async (id) => getTeamById(id)
  .then((team) => Team.destroy({ where: { id: team.id } }))
  .then(() => Promise.resolve());

module.exports = {
  getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam,
};
