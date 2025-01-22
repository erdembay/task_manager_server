const Joi = require("joi");

const createValidation = Joi.object({
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(8).max(15).required(),
  passwordRepeat: Joi.string().required(),
  email: Joi.string().min(2).max(125).required(),
});
const loginValidation = Joi.object({
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(8).max(15).required(),
});
module.exports = {
  createValidation,
  loginValidation,
};
