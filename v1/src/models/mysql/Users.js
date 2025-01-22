const { DataTypes } = require("sequelize");
const { mysqlDb } = require("../../loaders/mysql");
const User = mysqlDb.define(
  "User",
  {},
  {
    tableName: "users", // Tablo adı açıkça belirtiliyor
  }
);
module.exports = User;
