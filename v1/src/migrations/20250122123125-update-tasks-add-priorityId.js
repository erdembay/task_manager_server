"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("Tasks", "priority");
    await queryInterface.addColumn("Tasks", "priorityId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Priorities",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      allowNull: false,
    });
    await queryInterface.removeColumn("Tasks", "priorityId");
  },
};
