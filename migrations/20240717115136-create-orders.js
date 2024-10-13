"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      orderID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderCode: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      paymentCode: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      paymentStatus: {
        type: Sequelize.STRING(10),
        defaultValue: "Pending",
      },
      customerID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "customerID",
        },
      },
      orderDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userID",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
