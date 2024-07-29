"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      orderID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      paymentCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
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
