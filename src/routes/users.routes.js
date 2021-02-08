const express = require('express');

const router = express.Router();

const {
  userService,
} = require('../services');
const { validateUserCreateRequest, validateUserUpdateRequest } = require('../utils/validators/user-validator/user-validator');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       firstname:
 *                         type: string
 *                         description: The user's name.
 *                         example: Jelena
 *                       lastname:
 *                         type: integer
 *                         description: The user's lastname.
 *                         example: Mackic
 *                       username:
 *                         type: string
 *                         description: The user's username.
 *                         example: mac
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: macmac
 */
router.get('', ((req, res) => {
  userService.getAllUsers().then((users) => {
    res.send(users);
  }).catch((err) => {
    console.error(`Something went wrong${err}`);
    res.status(500).send({ message: 'Something went wrong' });
  });
}));

router.get('/:id', ((req, res) => {
  const { id } = req.params;
  userService.getUserById(id).then((users) => {
    res.send(users);
  }).catch((err) => {
    console.error(err);
    res.send(err.message).status(404);
  });
}));

router.post('', ((req, res) => {
  try {
    validateUserCreateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  userService.createUser(req.body).then((user) => {
    res.send(user);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.put('/:id', ((req, res) => {
  try {
    validateUserUpdateRequest(req.body);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  const { id } = req.params;
  const { body } = req;
  userService.updateUser(id, body).then((users) => {
    res.send(users);
  }).catch((err) => {
    res.send(err.message).status(400);
  });
}));

router.delete('/:id', ((req, res) => {
  const { id } = req.params;
  userService.deleteUser(id).then(() => {
    res.send(204);
  }).catch((err) => {
    res.send(err.message).status(404);
  });
}));

module.exports = router;
