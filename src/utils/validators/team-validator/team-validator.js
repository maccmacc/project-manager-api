const Joi = require('joi');
const validate = require('../index');

const teamCreateSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  description: Joi.string().alphanum().min(3).max(20)
    .required(),
});

const teamUpdateSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  description: Joi.string().alphanum().min(3).max(20)
    .required(),
});

const validateTeamCreateRequest = (data) => {
  const { error } = validate(data, teamCreateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

const validateTeamUpdateRequest = (data) => {
  const { error } = validate(data, teamUpdateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

module.exports = {
  validateTeamCreateRequest, validateTeamUpdateRequest,
};
