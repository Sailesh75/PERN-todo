const express = require("express");
const router = express.Router();
const { Todo, User } = require("../models");

//read all todo
router.get("/todos", async (req, res) => {
  try {
    const allTodo = await Todo.findAll({ include: "user" });
    res.status(200).json(allTodo);
  } catch (error) {
    res.status(500).json({ Error: "Internal Error" });
    console.error(error);
  }
});

//read a todo
router.get("/todos/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const oneTodo = await Todo.findAll({
      where: {
        uuid,
      },
      include: "user",
    });
    if (oneTodo.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(oneTodo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
    console.log(error);
  }
});

//post a todo
router.post("/todos", async (req, res) => {
  try {
    const { useruuid, description } = req.body;
    if (!description || !useruuid) {
      return res.status(400).json({ error: "Description is required" });
    }
    const user = await User.findOne({ where: { uuid: useruuid } });
    console.log("I am here;");
    console.log(user);
    const newTodo = await Todo.create({
      description,
      userId: user.id,
    });
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error while creating the data" });
    console.error(error);
  }
});

//update a todo
router.put("/todos/:uuid", async (req, res) => {
  try {
    const { description } = req.body;
    const { uuid } = req.params;
    await Todo.update(
      {
        description,
      },
      {
        where: {
          uuid,
        },
      }
    );
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ error: "Error updating data" });
    console.error(error);
  }
});

//delete all todo
router.delete("/todos", async (req, res) => {
  try {
    await Todo.truncate();
    res.status(200).json({ msg: "all records deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
    console.error(error);
  }
});

//delete a todo
router.delete("/todos/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    await Todo.destroy({
      where: {
        uuid,
      },
    });
    res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
    console.error(error);
  }
});

module.exports = router;
