"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        ProductName: "Sedan Car",
        Description: "A sleek and stylish sedan car with advanced features.",
        Brand: "Toyota",
        Price: 25000.0,
        Cost: 20000.0,
        QuantityOnHand: 20,
        ReorderLevel: 5,
      },
      {
        ProductName: "SUV",
        Description:
          "A rugged and spacious SUV perfect for off-road adventures.",
        Brand: "Jeep",
        Price: 35000.0,
        Cost: 28000.0,
        QuantityOnHand: 15,
        ReorderLevel: 5,
      },
      {
        ProductName: "Sports Car",
        Description:
          "An exhilarating sports car designed for speed and performance.",
        Brand: "Ferrari",
        Price: 150000.0,
        Cost: 120000.0,
        QuantityOnHand: 10,
        ReorderLevel: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
