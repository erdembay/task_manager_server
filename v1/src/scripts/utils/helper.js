const JWT = require("jsonwebtoken");
// const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const passwordToHash = async (password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
const passwordCompare = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
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
async function deleteTaskListCache(cacheKey) {
  try {
    let cursor = "0"; // SCAN komutu için başlangıç noktası (ilk tarama)
    const pattern = cacheKey + ":*"; // Silmek istediğin cache anahtarlarının pattern'ı
    const batchSize = 100; // Her seferinde taranacak anahtar sayısı
    do {
      // Redis SCAN komutunu kullanarak anahtarları tara
      const [newCursor, keys] = await redisCli.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        batchSize
      );
      // Bulunan anahtarları sil
      if (keys.length > 0) {
        await redisCli.del(...keys);
      }
      cursor = newCursor; // Bir sonraki tarama için cursor'ı güncelle
    } while (cursor !== "0"); // Eğer cursor '0' ise tarama tamamlanmış demektir.
  } catch (error) {
    console.error("Hata:", error);
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  passwordToHash,
  passwordCompare,
  deleteTaskListCache,
};
