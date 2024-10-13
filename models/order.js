import db from "@utils/sequelize";
import { DataTypes } from "sequelize";

const Order = db.define(
  "Orders",
  {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderCode: {
      type: DataTypes.STRING,
    },
    paymentCode: {
      type: DataTypes.STRING,
    },
    paymentStatus: {
      type: DataTypes.STRING,
    },
    customerID: {
      type: DataTypes.INTEGER,
    },
    orderDate: {
      type: DataTypes.DATE,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Orders",
    timestamps: false,
  }
);

module.exports = Order;
