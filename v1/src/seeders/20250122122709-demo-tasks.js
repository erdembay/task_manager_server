"use strict";

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
    await queryInterface.bulkInsert("Tasks", [
      {
        title: "Task 1",
        description: "This is task 1",
        priorityId: 2,
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        status: false,
        userId: 1, // Johndoe'nin userId'si
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task 2",
        description: "This is task 2",
        priorityId: 3,
        endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        status: false,
        userId: 2, // Janedoe'nin userId'si
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
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
