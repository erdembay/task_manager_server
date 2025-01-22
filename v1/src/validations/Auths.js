const Joi = require("joi");

const createValidation = Joi.object({
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(8).max(15).required(),
  repeatPassword: Joi.string().required(),
  name: Joi.string().min(2).max(15).required(),
});
const loginValidation = Joi.object({
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(8).max(15).required(),
});
module.exports = {
  createValidation,
  loginValidation,
};
