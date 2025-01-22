const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  endDate: Joi.date().required(),
  priorityId: Joi.number().required(),
  attachment: Joi.array().items(Joi.object()),
});
const updateValidation = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  endDate: Joi.date().required(),
  priorityId: Joi.number().required(),
  attachment: Joi.array().items(Joi.object()),
});
module.exports = {
  createValidation,
  updateValidation,
};
