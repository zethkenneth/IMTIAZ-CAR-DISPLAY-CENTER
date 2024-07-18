"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderDetails", {
      OrderID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "OrderID",
        },
      },
      ProductID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "ProductID",
        },
      },
      Quantity: {
        type: Sequelize.INTEGER,
      },
      UnitPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      TotalPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("OrderDetails");
  },
};
