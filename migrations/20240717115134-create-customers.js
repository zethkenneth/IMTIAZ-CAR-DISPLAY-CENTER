"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Customers", {
      customerID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING(100),
      },
      lastName: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(20),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Customers");
  },
};
