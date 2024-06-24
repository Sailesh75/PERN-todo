"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("users", "resetPasswordToken", {
      type: DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "resetPasswordExpires", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn("users", "resetPasswordToken");
    await queryInterface.removeColumn("users", "resetPasswordExpires");
  },
};
