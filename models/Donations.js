const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./user"); // Import the User model for association

const Donation = sequelize.define("Donation", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Donation.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" }); // Association with the User model
module.exports = Donation;
