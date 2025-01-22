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
    await queryInterface.bulkInsert("Attachments", [
      {
        taskId: 1,
        type: "image",
        filename: "Example.png",
        url: "https://static.wikia.nocookie.net/true_reverend_insanity/images/7/70/Example.png/revision/latest?cb=20200328112134",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: 2,
        type: "document",
        filename: "sample.pdf",
        url: "https://pdfobject.com/pdf/sample.pdf",
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
    await queryInterface.bulkDelete("Attachments", null, {});
  },
};
