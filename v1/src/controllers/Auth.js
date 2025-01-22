const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const AuthService = require("../services/MongoService/AuthService");
const {
  passwordToHash,
  generateAccessToken,
} = require("../scripts/utils/helper");
class Auths {
  async register(req, res, next) {
    try {
      const username = req?.body?.username;
      const password = req?.body?.password;
      const repeatPassword = req?.body?.repeatPassword;
      const name = req?.body?.name;
      if (password !== repeatPassword) {
        return next(
          new ApiError("Parolalar eşleşmiyor!", httpStatus.BAD_REQUEST)
        );
      }
      const response = await AuthService.create({
        username: username,
        password: passwordToHash(password),
        name: name,
      });
      if (!response) {
        return next(
          new ApiError("Kullanıcı Kaydı Başarısız!", httpStatus.BAD_REQUEST)
        );
      }
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(new ApiError(error?.message));
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
