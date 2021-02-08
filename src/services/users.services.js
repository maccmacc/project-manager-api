const { User } = require('../entities/index');

const getAllUsers = async () => User.findAll();

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error(`User with id ${id} is not found`);
  }

  return user;
};

const updateUser = async (id, userRaw) => {
  const {
    firstName, lastName, email, username, password,
  } = userRaw;

  const user = await getUserById(id);

  return user.update({
    ...user,
    firstName,
    lastName,
    username,
    email,
    password,
  });
};

const createUser = async (userRaw) => {
  const {
    firstName, lastName, email, username, password,
  } = userRaw;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
    });
    return user;
  } catch (error) {
    console.log(1, error);
    // logger
    throw new Error('User with this email already exist');
  }
};

const deleteUser = async (id) => getUserById(id)
  .then((user) => User.destroy({ where: { id: user.id } }))
  .then(() => Promise.resolve());

module.exports = {
  createUser, getAllUsers, getUserById, updateUser, deleteUser,
};
