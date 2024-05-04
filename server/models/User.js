"use strict";
const { Model } = require("sequelize");
// const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Todo }) {
      // define association here
      this.hasMany(Todo, { foreignKey: "userId", as: "todos" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a username" },
          notEmpty: { msg: "username must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Should be a proper email!" },
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "Email must not be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have password" },
          notEmpty: { msg: "Password must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
