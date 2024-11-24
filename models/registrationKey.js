const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const RegistrationKey = sequelize.define("RegistrationKey", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM("volunteer", "supervisor"),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = RegistrationKey;
