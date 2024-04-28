const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Todo = db.define(
  "Todo",
  {
    todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "todo",
  }
);

module.exports = Todo;
