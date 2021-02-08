const express = require('express');

const router = express.Router({ mergeParams: true });
const {
  projectService,
} = require('../services');
const { validateProjectCreateRequest, validateProjectUpdateRequest } = require('../utils/validators/project-validator/project-validator');

router.get('', ((req, res) => {
  projectService.getAllProjects().then((projects) => {
    res.send(projects);
  }).catch((err) => {
    console.error(`Something went wrong${err}`);
  });
}));

router.get('/:id', ((req, res) => {
  const { id } = req.params;
  projectService.getProjectById(id).then((project) => {
    res.send(project);
  }).catch((err) => {
    console.error(`Something went wrong${err}`);
  });
}));

router.get('/:id/teams', ((req, res) => {
  // projectId
  const { id } = req.params;

  projectService.getAllTeamsForOneProject(id).then((teams) => {
    res.send(teams);
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

router.post('', ((req, res) => {
  try {
    validateProjectCreateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  projectService.createProject(req.body).then((project) => {
    res.send(project);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.put('/:id', ((req, res) => {
  try {
    validateProjectUpdateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  const { id } = req.params;
  const { body } = req;
  projectService.updateProject(id, body).then((project) => {
    res.send(project);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.delete('/:id', ((req, res) => {
  const { id } = req.params;
  projectService.deleteProject(id).then(() => {
    res.send(204);
  }).catch((err) => {
    res.send(err.message).status(404);
  });
}));

module.exports = router;
