const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const UserService = require("../services/MySqlService/UserService");
class Users {
  async getAll(req, res, next) {
    try {
      const response = await UserService.list({
        attributes: ["id", "username", "email"],
        where: { activity: true },
      });
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Users();
