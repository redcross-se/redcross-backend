import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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
