const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Emergency = sequelize.define("Emergency", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additionalInfo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "dispatched"),
    defaultValue: "pending",
  },
  responderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Emergency;
