const { Project, Team } = require('../entities/index');

const getAllProjects = async () => Project.findAll();

const getProjectById = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) {
    throw new Error(`Project with id ${id} is not found`);
  }

  return project;
};

const updateProject = async (id, projectRaw) => {
  const {
    name, description,
  } = projectRaw;

  const project = await getProjectById(id);

  return project.update({
    ...project,
    name,
    description,
  });
};
const createProject = async (projectRaw) => {
  const {
    id, name, description,
    updatedAt,
  } = projectRaw;

  try {
    return Project.create({
      id,
      name,
      description,
      updatedAt,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Project with this name already exist');
  }
};

const deleteProject = async (id) => getProjectById(id)
  .then((project) => Project.destroy({ where: { id: project.id } }))
  .then(() => Promise.resolve());

const getAllTeamsForOneProject = async (projectId) => {
  const teamsForProject = await Team.findAll({ where: { projectId } });

  return teamsForProject;
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  deleteProject,
  updateProject,
  getAllTeamsForOneProject,
};
