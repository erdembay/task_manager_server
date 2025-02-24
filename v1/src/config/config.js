require("dotenv").config({ path: "../../.env" });
module.exports = {
  development: {
    username: process.env.MYSQL_DB_USER || "root",
    password: process.env.MYSQL_DB_PASS || "12345678",
    database: process.env.MYSQL_DB_NAME || "task_manager",
    host: process.env.MYSQL_DB_HOST || "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.MYSQL_DB_USER || "root",
    password: process.env.MYSQL_DB_PASS || "12345678",
    database: process.env.MYSQL_DB_NAME || "task_manager",
    host: process.env.MYSQL_DB_HOST || "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQL_DB_USER || "root",
    password: process.env.MYSQL_DB_PASS || "12345678",
    database: process.env.MYSQL_DB_NAME || "task_manager",
    host: process.env.MYSQL_DB_HOST || "localhost",
    dialect: "mysql",
  },
};
