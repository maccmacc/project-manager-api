const Joi = require('joi');
const validate = require('../index');

const teamProjectCreateSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  description: Joi.string().alphanum().min(3).max(20)
    .required(),
});

const validateTeamProjectCreateRequest = (data) => {
  const { error } = validate(data, teamProjectCreateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

module.exports = {
  validateTeamProjectCreateRequest,
};
