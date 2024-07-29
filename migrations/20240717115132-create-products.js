"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      productID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productName: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
      description2: {
        type: Sequelize.TEXT,
      },
      model: {
        type: Sequelize.TEXT,
      },
      year: {
        type: Sequelize.TEXT,
      },
      brand: {
        type: Sequelize.STRING(100),
      },
      type: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      quantityOnHand: {
        type: Sequelize.INTEGER,
      },
      reorderLevel: {
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
