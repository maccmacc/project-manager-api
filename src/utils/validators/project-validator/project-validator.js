const Joi = require('joi');
const validate = require('../index');

const projectCreateSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  description: Joi.string().alphanum().min(3).max(20)
    .required(),
});

const projectUpdateSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  description: Joi.string().alphanum().min(3).max(20)
    .required(),
});

const validateProjectCreateRequest = (data) => {
  const { error } = validate(data, projectCreateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

const validateProjectUpdateRequest = (data) => {
  const { error } = validate(data, projectUpdateSchema);
  if (error) {
    throw new Error(error);
  }
  return true;
};

module.exports = {
  validateProjectCreateRequest, validateProjectUpdateRequest,
};
