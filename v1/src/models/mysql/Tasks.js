const { DataTypes } = require("sequelize");
const { mysqlDb } = require("../../loaders/mysql");
const User = require("./Users");
const Priority = require("./Priorities");
const Task = mysqlDb.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priorityId: {
      type: DataTypes.INTEGER,
      references: {
        model: Priority, // Öncelik modeline referans
        key: "id",
      },
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "Tasks",
    timestamps: true,
  }
);
Task.belongsTo(User, { foreignKey: "userId", as: "user" });
Task.belongsTo(Priority, { foreignKey: "priorityId", as: "priority" });
module.exports = Task;
