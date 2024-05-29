const { Todo, User } = require("../models");

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const allTodo = await Todo.findAll({ include: "user" });
    res.status(200).json(allTodo);
  } catch (error) {
    res.status(500).json({ Error: "Internal Error" });
    console.error(error);
  }
};

// Get todos associated with a specific user
const getTodosByUserUuid = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const todos = await user.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { useruuid, description } = req.body;
    if (!description || !useruuid) {
      return res
        .status(400)
        .json({ error: "Description and user UUID are required" });
    }
    const user = await User.findOne({ where: { uuid: useruuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newTodo = await Todo.create({
      description,
      userId: user.id,
    });
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error while creating the todo" });
    console.error(error);
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const { uuid } = req.params;
    await Todo.update({ description }, { where: { uuid } });
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
    console.error(error);
  }
};

// Update checkbox status of todo
const updateTodoStatus = async (req, res) => {
  try {
    const { isCompleted } = req.body;
    const { uuid } = req.params;
    await Todo.update({ isCompleted }, { where: { uuid } });
    res.status(200).json({ message: "Update successful", isCompleted });
  } catch (error) {
    res.status(500).json({ error: "Error updating todo status" });
    console.error(error);
  }
};

// Delete all todos
const deleteAllTodos = async (req, res) => {
  try {
    await Todo.truncate();
    res.status(200).json({ msg: "All todos deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todos" });
    console.error(error);
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { uuid } = req.params;
    await Todo.destroy({ where: { uuid } });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
    console.error(error);
  }
};

module.exports = {
  getAllTodos,
  getTodosByUserUuid,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteAllTodos,
  deleteTodo,
};
