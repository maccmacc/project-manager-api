const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  teamService,
} = require('../services');
const { validateTeamCreateRequest, validateTeamUpdateRequest } = require('../utils/validators/team-validator/team-validator');

router.get('', ((req, res) => {
  teamService.getAllTeams().then((teams) => {
    res.send(teams);
  }).catch((err) => {
    console.error(`Something went wrong${err}`);
  });
}));

router.get('/:id', ((req, res) => {
  const { id } = req.params;
  teamService.getTeamById(id).then((teams) => {
    res.send(teams);
  }).catch((err) => {
    console.error(err);
    res.send(err.message).status(404);
  });
}));

router.post('', ((req, res) => {
  try {
    validateTeamCreateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  teamService.createTeam(req.body).then((team) => {
    res.send(team);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.put('/:id', ((req, res) => {
  try {
    validateTeamUpdateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  const { id } = req.params;
  const { body } = req;
  teamService.updateTeam(id, body).then((teams) => {
    res.send(teams);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.delete('/:id', ((req, res) => {
  const { id } = req.params;
  teamService.deleteTeam(id).then(() => {
    res.send(204);
  }).catch((err) => {
    res.send(err.message).status(404);
  });
}));

module.exports = router;
