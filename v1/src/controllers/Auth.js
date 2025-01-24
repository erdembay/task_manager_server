const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const AuthService = require("../services/MongoService/AuthService");
const UserService = require("../services/MySqlService/UserService");
const {
  passwordToHash,
  generateAccessToken,
  passwordCompare,
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
      const password = req?.body?.password;
      const response = await UserService.findOne({
        attributes: ["id", "username", "password", "email"],
        where: { username: username, activity: true },
      });
      if (!response) {
        return next(
          new ApiError(
            "Kayıtlı Kullanıcı Bulunmamaktadır!",
            httpStatus.BAD_REQUEST
          )
        );
      }
      const passwordCheck = await passwordCompare(password, response?.password);
      if (!passwordCheck) {
        return next(
          new ApiError(
            "Kullanıcı Adı veya Şifre Hatalı!",
            httpStatus.BAD_REQUEST
          )
        );
      }
      const tokenBody = {
        username: response?.username,
        id: response?.id,
      };
      const accessToken = generateAccessToken(tokenBody);
      req.session.user = {
        id: response?.id,
        username: response?.username,
        email: response?.email,
        jwt: accessToken,
      };
      res
        .status(httpStatus.OK)
        .send({ message: "Giriş Başarılı!", jwt: accessToken });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async logout(req, res, next) {
    try {
      await req.session.destroy();
      res
        .status(httpStatus.OK)
        .send({ status: true, message: "Çıkış Başarılı!" });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Auths();
