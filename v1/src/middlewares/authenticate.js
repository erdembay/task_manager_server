const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const apiError = require("../errors/ApiError");
const authenticateToken = (where) => (req, res, next) => {
  if (!req.session?.user?.jwt) {
    return next(new apiError("Giriş Yapmalısınız!", httpStatus.UNAUTHORIZED));
  }
  const token = req.session?.user?.jwt;
  if (token === null) {
    return next(new apiError("Giriş Yapmalısınız!", httpStatus.UNAUTHORIZED));
  }
  const jwtoptions = {
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE,
    algorithms: "HS512",
  };
  JWT.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    jwtoptions,
    (err, data) => {
      if (err)
        return next(
          new apiError(
            err?.message ?? "Giriş Yapmalısınız!",
            httpStatus.UNAUTHORIZED
          )
        );
      req.tokendata = data;
      next();
    }
  );
};
module.exports = {
  authenticateToken,
};
