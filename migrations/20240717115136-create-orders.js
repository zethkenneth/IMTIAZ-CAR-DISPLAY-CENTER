"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      OrderID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      PaymentCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      CustomerID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "CustomerID",
        },
      },
      OrderDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      TotalAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "UserID",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
