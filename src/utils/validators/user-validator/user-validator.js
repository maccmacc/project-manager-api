const Joi = require('joi');
const validate = require('../index');

const userCreateSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastname: Joi.string().alphanum().min(3).max(20)
    .required(),
  username: Joi.string().alphanum().min(3).max(20)
    .required(),
  password: Joi.string().alphanum().min(3).max(20)
    .required(),
  email: Joi.string().alphanum().min(3).max(20),
});

const userUpdateSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastname: Joi.string().alphanum().min(3).max(20)
    .required(),
  username: Joi.string().alphanum().min(3).max(20)
    .required(),
  password: Joi.string().alphanum().min(3).max(20)
    .required(),
  email: Joi.string().alphanum().min(3).max(20),
});

const validateUserCreateRequest = (data) => {
  const { error } = validate(data, userCreateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

const validateUserUpdateRequest = (data) => {
  const { error } = validate(data, userUpdateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

module.exports = {
  validateUserCreateRequest, validateUserUpdateRequest,
};
