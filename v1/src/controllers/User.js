const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const UserService = require("../services/MySqlService/UserService");
class Auths {
  async getAll(req, res, next) {
    try {
      const response = await UserService.list({
        where: { activity: true },
      });
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Auths();
