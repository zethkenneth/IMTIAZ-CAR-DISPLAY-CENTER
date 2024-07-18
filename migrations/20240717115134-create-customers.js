"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Customers", {
      CustomerID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      FirstName: {
        type: Sequelize.STRING(100),
      },
      LastName: {
        type: Sequelize.STRING(100),
      },
      Email: {
        type: Sequelize.STRING(255),
      },
      Phone: {
        type: Sequelize.STRING(20),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Customers");
  },
};
