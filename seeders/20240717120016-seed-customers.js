"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Customers", [
      {
        FirstName: "John",
        LastName: "Doe",
        Email: "john.doe@example.com",
        Phone: "123-456-7890",
      },
      {
        FirstName: "Jane",
        LastName: "Smith",
        Email: "jane.smith@example.com",
        Phone: "987-654-3210",
      },
      {
        FirstName: "Michael",
        LastName: "Johnson",
        Email: "michael.j@example.com",
        Phone: "555-123-4567",
      },
      {
        FirstName: "Emily",
        LastName: "Brown",
        Email: "emily.b@example.com",
        Phone: "222-333-4444",
      },
      {
        FirstName: "William",
        LastName: "Taylor",
        Email: "will.t@example.com",
        Phone: "888-999-0000",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
