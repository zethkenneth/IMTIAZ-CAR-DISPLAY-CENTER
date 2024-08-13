"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("OrderDetails", [
      {
        orderID: 1,
        productID: 1,
        quantity: 2,
        unitPrice: 50.0,
        totalPrice: 100.0,
      },
      {
        orderID: 1,
        productID: 2,
        quantity: 1,
        unitPrice: 150.0,
        totalPrice: 150.0,
      },
      {
        orderID: 2,
        productID: 3,
        quantity: 3,
        unitPrice: 75.0,
        totalPrice: 225.0,
      },
      {
        orderID: 2,
        productID: 4,
        quantity: 2,
        unitPrice: 60.0,
        totalPrice: 120.0,
      },
      {
        orderID: 3,
        productID: 5,
        quantity: 4,
        unitPrice: 25.0,
        totalPrice: 100.0,
      },
      {
        orderID: 3,
        productID: 6,
        quantity: 1,
        unitPrice: 500.0,
        totalPrice: 500.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
