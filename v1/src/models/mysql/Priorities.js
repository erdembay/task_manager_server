const { DataTypes } = require("sequelize");
const { mysqlDb } = require("../../loaders/mysql");
const Priority = mysqlDb.define(
  "Priority",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Priorities",
    timestamps: true,
  }
);
module.exports = Priority;
