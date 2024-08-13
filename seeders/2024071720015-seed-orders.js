"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        orderID: 1,
        paymentCode: "GSFA231",
        paymentStatus: "Pending",
        customerID: 1,
        orderDate: "2024-08-10",
        totalAmount: 100.5,
        userID: 1,
      },
      {
        orderID: 2,
        paymentCode: "GSFA232",
        paymentStatus: "Completed",
        customerID: 1,
        orderDate: "2024-08-11",
        totalAmount: 150.75,
        userID: 1,
      },
      {
        orderID: 3,
        paymentCode: "GSFA233",
        paymentStatus: "Cancelled",
        customerID: 1,
        orderDate: "2024-08-12",
        totalAmount: 75.0,
        userID: 1,
      },
      {
        orderID: 4,
        paymentCode: "GSFA234",
        paymentStatus: "Pending",
        customerID: 1,
        orderDate: "2024-08-13",
        totalAmount: 200.25,
        userID: 1,
      },
      {
        orderID: 5,
        paymentCode: "GSFA235",
        paymentStatus: "Completed",
        customerID: 1,
        orderDate: "2024-08-14",
        totalAmount: 300.5,
        userID: 1,
      },
      {
        orderID: 6,
        paymentCode: "GSFA236",
        paymentStatus: "Pending",
        customerID: 1,
        orderDate: "2024-08-15",
        totalAmount: 250.0,
        userID: 1,
      },
      {
        orderID: 7,
        paymentCode: "GSFA237",
        paymentStatus: "Cancelled",
        customerID: 1,
        orderDate: "2024-08-16",
        totalAmount: 120.0,
        userID: 1,
      },
      {
        orderID: 8,
        paymentCode: "GSFA238",
        paymentStatus: "Completed",
        customerID: 1,
        orderDate: "2024-08-17",
        totalAmount: 500.0,
        userID: 1,
      },
      {
        orderID: 9,
        paymentCode: "GSFA239",
        paymentStatus: "Pending",
        customerID: 1,
        orderDate: "2024-08-18",
        totalAmount: 450.75,
        userID: 1,
      },
      {
        orderID: 10,
        paymentCode: "GSFA240",
        paymentStatus: "Completed",
        customerID: 1,
        orderDate: "2024-08-19",
        totalAmount: 600.0,
        userID: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
