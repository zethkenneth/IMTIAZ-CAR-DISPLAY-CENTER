import db from "@utils/sequelize"
import { DataTypes } from "sequelize";

const Product = db.define(
  "Products",
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    description2: {
      type: DataTypes.JSON,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    quantityOnHand: {
      type: DataTypes.INTEGER,
    },
    reorderLevel: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    chasis: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Products",
    timestamps: false,
  }
);

module.exports = Product;