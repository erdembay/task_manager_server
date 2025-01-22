const redis = require("ioredis");

const connectRedis = async () => {
  try {
    global.redisCli = new redis(
      `redis://:${process.env.REDIS_AUTH}@${process.env.REDIS_IP}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`
    );
    global.redisCli.on("connect", () => {
      console.log("Redis Connected...");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectRedis,
};
