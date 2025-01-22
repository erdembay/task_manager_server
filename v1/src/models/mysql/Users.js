const { DataTypes } = require("sequelize");
const { mysqlDb } = require("../../loaders/mysql");
const User = mysqlDb.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Users", // Tablo adı açıkça belirtiliyor
    timestamps: true, // createdAt ve updatedAt kolonlarını ekler
  }
);
module.exports = User;
