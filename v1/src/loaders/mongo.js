const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("Mongo DB Bağlantısı Başarılıdır...");
});

const connectMongoDB = async () => {
  Mongoose.set("strictQuery", false);
  let uri;
  if (process.env.ENVIRONMENT === "production") {
    uri = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_DB_NAME}`;
  } else {
    uri = `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`;
  }
  await Mongoose.connect(uri).catch((e) => {
    console.log(e);
  });
};

module.exports = {
  connectMongoDB,
};
