const JWT = require("jsonwebtoken");
// const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const passwordToHash = async (password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
// const passwordToHash = (password) => {
//   return CryptoJS.HmacSHA256(
//     password,
//     CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()
//   ).toString();
// };
const generateAccessToken = (data) => {
  // 3 gün geçerli
  const jwtoptions = {
    audience: process.env.TOKEN_AUDIENCE,
    issuer: process.env.TOKEN_ISSUER,
    algorithm: "HS512",
    expiresIn: "3d",
  };
  return JWT.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, jwtoptions);
};
const generateRefreshToken = (data) => {
  const jwtoptions = {
    audience: process.env.TOKEN_AUDIENCE,
    issuer: process.env.TOKEN_ISSUER,
    algorithm: "HS512",
  };
  return JWT.sign(data, process.env.REFRESH_TOKEN_SECRET_KEY, jwtoptions);
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  passwordToHash,
};
