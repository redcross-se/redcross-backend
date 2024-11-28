const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path to your database configuration

const Application = sequelize.define('Application', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'ALL', 'Accepted', 'Rejected'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Application;
