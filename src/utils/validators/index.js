const validate = (data, schema) => schema.validate(data, {
  abortEarly: false,
  allowUnknown: false,
});

module.exports = validate;
