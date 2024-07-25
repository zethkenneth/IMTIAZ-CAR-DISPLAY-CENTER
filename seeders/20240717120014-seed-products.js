"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        ProductName: "Sedan Car",
        Description: "A sleek and stylish sedan car with advanced features.",
        Model: "Model 2023",
        Brand: "Toyota",
        Price: 25000.0,
        Cost: 20000.0,
        QuantityOnHand: 20,
        ReorderLevel: 5,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
          "/assets/cars/toyota-camry.png",
          "/assets/cars/toyota-camry-front.png",
        ],
      },
      {
        ProductName: "SUV",
        Description:
          "A rugged and spacious SUV perfect for off-road adventures.",
        Model: "Model 2024",
        Brand: "Jeep",
        Price: 35000.0,
        Cost: 28000.0,
        QuantityOnHand: 15,
        ReorderLevel: 5,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
          "/assets/cars/toyota-camry.png",
          "/assets/cars/toyota-camry-front.png",
        ],
      },
      {
        ProductName: "Sports Car",
        Description:
          "An exhilarating sports car designed for speed and performance.",
        Model: "Model 2022",
        Brand: "Ferrari",
        Price: 150000.0,
        Cost: 120000.0,
        QuantityOnHand: 10,
        ReorderLevel: 3,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
          "/assets/cars/toyota-camry.png",
          "/assets/cars/toyota-camry-front.png",
        ],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
