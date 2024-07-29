"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Customers", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
      },
      {
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.j@example.com",
        phone: "555-123-4567",
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
