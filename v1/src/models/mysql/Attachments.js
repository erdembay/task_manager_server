const { DataTypes } = require("sequelize");
const { mysqlDb } = require("../../loaders/mysql");
const Task = require("./Tasks");
const Attachment = mysqlDb.define(
  "Attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: Task,
        key: "id",
      },
      allowNull: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true, // 'image', 'video', 'document'
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Attachments",
    timestamps: true,
  }
);
Attachment.belongsTo(Task, { foreignKey: "taskId", as: "task" });
module.exports = Attachment;
