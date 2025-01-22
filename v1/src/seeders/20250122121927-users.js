"use strict";
const { passwordToHash } = require("../scripts/utils/helper");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        username: "johndoe",
        email: "johndoe@example.com",
        password: await passwordToHash("123456789"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        password: await passwordToHash("123456789"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
