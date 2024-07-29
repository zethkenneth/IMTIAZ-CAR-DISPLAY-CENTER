"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderDetails", {
      orderID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "orderID",
        },
      },
      productID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "productID",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("OrderDetails");
  },
};
