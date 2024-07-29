"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        productName: "Toyota Camry",
        description:
          "The Toyota Camry is a popular mid-size sedan that blends practicality with luxury. Known for its smooth ride and well-designed interior, the Camry has been a favorite among families and professionals alike. It offers a range of features that cater to both performance and comfort.",
        description2: JSON.stringify({
          overview:
            "The Toyota Camry is a popular mid-size sedan that blends practicality with luxury. Known for its smooth ride and well-designed interior, the Camry has been a favorite among families and professionals alike. It offers a range of features that cater to both performance and comfort.",
          engine_options:
            "The Camry typically comes with a choice of engines, including a fuel-efficient four-cylinder engine and a more powerful V6 option, providing a balance between performance and efficiency.",
          transmission:
            "It usually features an 8-speed automatic transmission that ensures a smooth driving experience and efficient power delivery.",
          fuel_efficiency:
            "The Camry is known for its excellent fuel economy, with the four-cylinder model offering impressive miles per gallon (MPG), making it a cost-effective choice for daily commutes and long drives.",
          interior:
            "Inside, the Camry offers a spacious cabin with high-quality materials and an intuitive layout. Features often include a touchscreen infotainment system, Apple CarPlay, Android Auto, and available leather upholstery.",
          safety:
            "Toyota places a strong emphasis on safety with the Camry, which comes equipped with advanced safety features such as adaptive cruise control, lane departure warning, automatic emergency braking, and a rearview camera.",
          comfort:
            "The Camry provides a comfortable ride with supportive seats and a smooth suspension system. Available options might include heated and ventilated seats, dual-zone climate control, and a sunroof.",
          design:
            "The exterior design of the Camry is sleek and modern, with a distinctive front grille, aerodynamic lines, and stylish lighting elements. It often features alloy wheels and a choice of vibrant colors.",
          performance:
            "The Toyota Camry delivers a well-rounded driving experience, with responsive handling and a choice of engines that cater to different driving preferences. The ride quality is generally smooth and composed, making it a pleasant car for both city and highway driving.",
        }),
        year: 2023,
        model: "Camry SE",
        type: "brand new",
        category: "car",
        price: 25000 * 55,
        quantityOnHand: 10,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Honda Civic",
        description:
          "The Honda Civic is a compact car known for its practicality, high-quality interior, and engaging driving experience. With a reputation for reliability and strong resale value, the Civic is a popular choice among a wide range of drivers, from daily commuters to enthusiasts.",
        description2: JSON.stringify({
          overview:
            "The Honda Civic is a popular compact car with great fuel economy. It offers a blend of practicality and style, with a reputation for reliability and value.",
          engine_options:
            "The Civic typically comes with a choice of a fuel-efficient four-cylinder engine, offering a balance of performance and economy.",
          transmission:
            "It features a continuously variable transmission (CVT) for smooth and efficient driving.",
          fuel_efficiency:
            "The Civic is known for its impressive fuel efficiency, making it a cost-effective option for both daily commutes and long drives.",
          interior:
            "The Civic’s interior is designed with high-quality materials and includes a touchscreen infotainment system with Apple CarPlay and Android Auto.",
          safety:
            "Honda prioritizes safety with the Civic, equipping it with advanced safety features such as Honda Sensing, which includes adaptive cruise control and lane departure warning.",
          comfort:
            "The Civic provides a comfortable ride with supportive seats. Features might include dual-zone climate control and available leather upholstery.",
          design:
            "The exterior design of the Civic is modern and stylish, featuring clean lines and available alloy wheels.",
          performance:
            "The Honda Civic offers a dynamic driving experience with responsive handling and a choice of engines catering to different driving preferences.",
        }),
        year: 2022,
        model: "Civic LX",
        type: "brand new",
        category: "car",
        price: 22000 * 55,
        quantityOnHand: 15,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Ford Mustang",
        description:
          "The Ford Mustang is an iconic American muscle car known for its powerful performance, aggressive styling, and thrilling driving experience. It combines a rich heritage with modern technology, making it a favorite among car enthusiasts.",
        description2: JSON.stringify({
          overview:
            "The Ford Mustang is a legendary muscle car that offers a unique blend of performance and style. With a rich history and modern enhancements, it remains a top choice for those seeking a high-performance driving experience.",
          engine_options:
            "The Mustang typically offers a range of engine options, including a turbocharged four-cylinder engine and several V8 engines, providing a variety of performance levels to suit different driving preferences.",
          transmission:
            "It comes with a choice of a 6-speed manual transmission or a 10-speed automatic transmission, both of which deliver smooth and responsive shifts.",
          fuel_efficiency:
            "While focusing on performance, the Mustang also offers reasonable fuel efficiency for its class, with various engines providing different fuel economy figures.",
          interior:
            "Inside, the Mustang features a driver-focused cockpit with high-quality materials. It includes a modern infotainment system with options for a large touchscreen, Apple CarPlay, and Android Auto.",
          safety:
            "Ford equips the Mustang with a range of safety features, including advanced driver-assistance systems like automatic emergency braking, lane-keeping assist, and adaptive cruise control.",
          comfort:
            "The Mustang provides a comfortable ride with supportive seats and an optional climate control system. Features like heated and ventilated seats are available on higher trims.",
          design:
            "The exterior design of the Mustang is bold and aggressive, featuring a distinctive front grille, aerodynamic lines, and signature LED lighting. It is available in a range of vibrant colors and wheel designs.",
          performance:
            "The Ford Mustang delivers exhilarating performance with its powerful engines, responsive handling, and dynamic driving characteristics. It offers a thrilling driving experience whether on the road or track.",
        }),
        year: 2024,
        model: "Mustang GT",
        type: "brand new",
        category: "car",
        price: 50000 * 55,
        quantityOnHand: 12,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Chevrolet Tahoe",
        description:
          "The Chevrolet Tahoe is a full-size SUV known for its spacious interior, strong performance, and advanced technology. It is ideal for families and those who need ample cargo space and towing capabilities.",
        description2: JSON.stringify({
          overview:
            "The Chevrolet Tahoe offers a blend of power and luxury, with a roomy interior and a range of advanced features. It is a popular choice for those needing a versatile and capable SUV.",
          engine_options:
            "The Tahoe typically comes with a choice of powerful engines, including a standard V8 and an optional turbo-diesel engine, providing robust performance and towing capacity.",
          transmission:
            "It features a 10-speed automatic transmission that delivers smooth shifting and optimal performance.",
          fuel_efficiency:
            "The Tahoe offers reasonable fuel efficiency for its class, with the V8 engine providing a balance between power and economy. The diesel option offers better fuel economy for long-distance driving.",
          interior:
            "Inside, the Tahoe boasts a spacious cabin with high-quality materials. It includes a large touchscreen infotainment system with Apple CarPlay and Android Auto, and offers options for leather upholstery and heated/ventilated seats.",
          safety:
            "Chevrolet equips the Tahoe with a suite of advanced safety features, including automatic emergency braking, lane-keeping assist, adaptive cruise control, and a 360-degree camera system.",
          comfort:
            "The Tahoe provides a comfortable ride with ample legroom and available premium features such as a panoramic sunroof, tri-zone climate control, and a premium sound system.",
          design:
            "The exterior design of the Tahoe is bold and commanding, featuring a modern front grille, sleek lines, and LED lighting. It offers a variety of wheel designs and exterior colors to choose from.",
          performance:
            "The Chevrolet Tahoe delivers strong performance with its powerful engines and advanced suspension system, providing a smooth and confident driving experience both on and off the road.",
        }),
        year: 2023,
        model: "Tahoe LT",
        type: "brand new",
        category: "SUV",
        price: 55000 * 55,
        quantityOnHand: 8,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Tesla Model 3",
        description:
          "The Tesla Model 3 is a fully electric sedan known for its impressive range, cutting-edge technology, and sleek design. It offers a sustainable and high-performance alternative to traditional gasoline-powered vehicles.",
        description2: JSON.stringify({
          overview:
            "The Tesla Model 3 is a fully electric sedan offering a sustainable and high-performance alternative to traditional gasoline-powered vehicles. It is known for its impressive range, advanced technology, and sleek design.",
          engine_options:
            "As an electric vehicle, the Model 3 does not have a traditional engine but instead uses electric motors to provide instant torque and smooth acceleration.",
          transmission:
            "The Model 3 features a single-speed transmission that delivers seamless power to the wheels.",
          fuel_efficiency:
            "The Model 3 is highly efficient, offering a long electric range on a single charge, making it an excellent choice for both city driving and longer trips.",
          interior:
            "Inside, the Model 3 features a minimalist design with high-quality materials and a large touchscreen that controls most of the vehicle’s functions. It includes features like wireless charging and premium audio.",
          safety:
            "Tesla prioritizes safety with the Model 3, equipping it with advanced driver-assistance features such as autopilot, adaptive cruise control, automatic emergency braking, and a robust suite of safety sensors.",
          comfort:
            "The Model 3 provides a comfortable ride with supportive seats and a quiet cabin. Features like heated seats and a premium sound system enhance the overall comfort.",
          design:
            "The exterior design of the Model 3 is modern and aerodynamic, with a sleek profile, flush door handles, and distinctive LED lighting. It is available in various colors and wheel designs.",
          performance:
            "The Tesla Model 3 delivers impressive performance with its electric motors providing instant acceleration and responsive handling. It offers a smooth and engaging driving experience, making it a standout in its class.",
        }),
        year: 2023,
        model: "Model 3 Standard Range Plus",
        type: "brand new",
        category: "electric",
        price: 40000 * 55,
        quantityOnHand: 5,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Air Filter",
        description: "A replacement air filter for various car models.",
        category: "auto part",
        price: 30 * 55, // Converted to pesos
        quantityOnHand: 50,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Brake Pad Set",
        description:
          "High-performance brake pads for safe and reliable braking.",
        category: "auto part",
        price: 70 * 55, // Converted to pesos
        quantityOnHand: 40,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Oil Filter",
        description:
          "A high-quality oil filter to keep your engine running smoothly.",
        category: "auto part",
        price: 25 * 55, // Converted to pesos
        quantityOnHand: 60,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Spark Plug",
        description: "Premium spark plugs for efficient engine performance.",
        category: "auto part",
        price: 15 * 55, // Converted to pesos
        quantityOnHand: 80,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
      {
        productName: "Headlight Bulb",
        description:
          "Bright and durable headlight bulbs for improved visibility.",
        category: "auto part",
        price: 40 * 55, // Converted to pesos
        quantityOnHand: 70,
        reorderLevel: 2,
        imageUrl: [
          "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2025/civic-sedan/non-VLP/04-Nav/MY25_Civic_Sedan_Petrol_All_Vehicles_Jelly.png?sc_lang=en&hash=25C6D3C1A7EDC2871B851B9F7DDFA13C",
        ],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
