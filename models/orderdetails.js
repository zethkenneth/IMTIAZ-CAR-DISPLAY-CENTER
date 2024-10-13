import db from "@utils/sequelize";
import { DataTypes } from "sequelize";

const OrderDetail = db.define(
  "OrderDetails",
  {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "OrderDetails",
    timestamps: false,
  }
);

module.exports = OrderDetail;
