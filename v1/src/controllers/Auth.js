const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const AuthService = require("../services/MongoService/AuthService");
const UserService = require("../services/MySqlService/UserService");
const {
  passwordToHash,
  generateAccessToken,
} = require("../scripts/utils/helper");
class Auths {
  async register(req, res, next) {
    try {
      const username = req?.body?.username;
      const password = req?.body?.password;
      const email = req?.body?.email;
      const response = await UserService.create({
        username: username,
        email: email,
        password: await passwordToHash(password),
      });
      if (!response) {
        return next(
          new ApiError("Kullanıcı Kaydı Başarısız!", httpStatus.BAD_REQUEST)
        );
      }
      res.status(httpStatus.OK).send({
        status: true,
        message: "Kullanıcı Kaydı Başarılı!",
        data: {
          id: response?.id,
          username: response?.username,
          email: response?.email,
        },
      });
    } catch (error) {
      next(new ApiError(error?.errors[0]?.message ?? error?.message));
    }
  }
  async login(req, res, next) {
    try {
      const username = req?.body?.username;
      const password = passwordToHash(req?.body?.password);
      const response = await AuthService.findOne({ username, password });
      if (!response) {
        return next(
          new ApiError(
            "Kullanıcı Adı veya Parola Hatalı!",
            httpStatus.BAD_REQUEST
          )
        );
      }
      const tokenBody = {
        username: response?.username,
        _id: response?._id,
      };
      const accessToken = generateAccessToken(tokenBody);
      res
        .status(httpStatus.OK)
        .send({ message: "Giriş Başarılı", jwt: accessToken });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Auths();
