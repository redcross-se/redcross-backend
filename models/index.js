const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/dbConfig");

const sequelize = new Sequelize(dbConfig.development);

module.exports = sequelize;
