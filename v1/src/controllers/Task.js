const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const TaskService = require("../services/MongoService/TaskService");
class Tasks {
  async getAll(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Get All",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async create(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Create",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async update(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Update",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async delete(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Delete",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Tasks();
