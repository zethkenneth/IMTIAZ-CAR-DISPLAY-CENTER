"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      ProductID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductName: {
        type: Sequelize.STRING(255),
      },
      Description: {
        type: Sequelize.TEXT,
      },
      Brand: {
        type: Sequelize.STRING(100),
      },
      Price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      Cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      QuantityOnHand: {
        type: Sequelize.INTEGER,
      },
      ReorderLevel: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
