const express = require('express');

const router = express.Router({ mergeParams: true });
const { teamProjectService } = require('../services');
const { validateTeamProjectCreateRequest } = require('../utils/validators/teams-projects-validator/teams-projects');

router.post('', ((req, res) => {
  // id => teamId
  try {
    validateTeamProjectCreateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  const { id } = req.params;
  const { name, description, projectId } = req.body;
  console.log(projectId);
  teamProjectService.addProjectToTeam(id, name, description, projectId).then((teamProjects) => {
    res.send(teamProjects);
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

router.delete('/:projectId', ((req, res) => {
  const { id, projectId } = req.params;
  teamProjectService.removeProjectFromTeam(id, projectId).then(() => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

module.exports = router;
