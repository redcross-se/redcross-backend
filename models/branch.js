const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Branch = sequelize.define("Branch", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Branch;
