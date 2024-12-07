const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
