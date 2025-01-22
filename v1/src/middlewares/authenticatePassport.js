const passport = require('../config/passport');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');
const authenticateToken = (where) => (req, res, next) => {
  // JWT doğrulamasını gerçekleştirir ve kullanıcıyı `req.user` üzerine ekler
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(new ApiError(err?.message || "Sunucu Hatası!", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else if (!user) {
            return next(new ApiError("Giriş Yapılmalıdır!", httpStatus.UNAUTHORIZED));
        }
        else if (where && where !== user?.role?.name) {
            return next(new ApiError("Yetkisiz Erişim!", httpStatus.FORBIDDEN));
        }
        req.user = user;
        next();
    })(req, res, next);
};
module.exports = {
    authenticateToken
};
