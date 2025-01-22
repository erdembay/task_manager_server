const { mysqlDb } = require("../loaders/mysql");
const db = {};
db.sequelize = mysqlDb;
module.exports = db;
