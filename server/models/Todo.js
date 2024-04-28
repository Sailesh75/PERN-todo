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
    // Specify the table name explicitly
    tableName: "todo",
  }
);

module.exports = Todo;
