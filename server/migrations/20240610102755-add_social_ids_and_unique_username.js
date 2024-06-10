"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("users", "googleId", {
      type: DataTypes.STRING,
      unique: true,
    });

    await queryInterface.addColumn("users", "githubId", {
      type: DataTypes.STRING,
      unique: true,
    });

    await queryInterface.addColumn("users", "gitlabId", {
      type: DataTypes.STRING,
      unique: true,
    });

    await queryInterface.changeColumn("users", "username", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
