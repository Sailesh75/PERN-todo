const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodosByUserUuid,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteAllTodos,
  deleteTodo,
} = require("../controllers/todos.controller");

// Get all todos
router.get("/todos", getAllTodos);

// Get todos associated with a specific user
router.get("/todos/:uuid", getTodosByUserUuid);

// Create a new todo
router.post("/todos", createTodo);

// Update a todo
router.put("/todos/:uuid", updateTodo);

// Update checkbox status of todo
router.put("/todos/check/:uuid", updateTodoStatus);

// Delete all todos
router.delete("/todos", deleteAllTodos);

// Delete a todo
router.delete("/todos/:uuid", deleteTodo);

module.exports = router;
