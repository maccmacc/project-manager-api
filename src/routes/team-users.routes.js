const express = require('express');

const router = express.Router({ mergeParams: true });
const { userTeamService } = require('../services');

router.post('', ((req, res) => {
  // id => teamId
  const { id } = req.params;
  const { userId, role } = req.body;
  userTeamService.addUserToTeam(id, userId, role).then((userTeam) => {
    res.send(userTeam);
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

// teams/:id/users
router.get('', ((req, res) => {
  // teamId
  const { id } = req.params;

  userTeamService.getAllUsersFromTeam(id).then((users) => {
    res.send(users);
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

router.delete('/:userId', ((req, res) => {
  const { id, userId } = req.params;
  userTeamService.removeUserFromTeam(id, userId).then(() => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send(err.message);
  });
}));

module.exports = router;
