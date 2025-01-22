const { connectMySQL } = require("./mysql");
const { connectMongoDB } = require("./mongo");
const { connectRedis } = require("./redis");
module.exports = () => {
  connectMySQL();
  connectMongoDB();
  connectRedis();
};
