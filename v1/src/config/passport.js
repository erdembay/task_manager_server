const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserService = require("../services/MySqlService/UserService"); // Kullanıcı modelinizi ekleyin
const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:
    secretKey ||
    "keykeykeybbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhbbbbbbssssssssssssssssssssasssddddddddddddddkddaaaaaaaaaaaaawwwwawwwwwneqr",
  issuer: process.env.TOKEN_ISSUER,
  audience: process.env.TOKEN_AUDIENCE,
  algorithms: "HS512",
};
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await UserService.findOne({
        id: jwtPayload.id,
        activity: true,
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
