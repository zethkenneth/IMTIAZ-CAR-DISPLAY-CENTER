const bcrypt = require("bcrypt");
("use strict");

// Function to hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword("admin123");
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password: hashedPassword,
        firstname: "Luffy",
        lastname: "Monkey",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
