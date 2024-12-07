const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Request = sequelize.define("Request", {
  hospital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  urgency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Request;
