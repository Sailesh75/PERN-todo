const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 5000;

//middleware function

app.use(cors());
app.use(express.json()); //gives excess to request.body which helps to get data from the client

//Routes (building routes using postgres queries)

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
      [description, id]
    );
    res.json("Todo updated successfully!!");
  } catch (error) {
    console.log(error);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1 ", [
      id,
    ]);
    res.json("Row deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

//delete all todos

app.delete("/todos", async (req, res) => {
  try {
    const deleteAll = await pool.query("DELETE FROM todo;");
    res.json("All records deleted!!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log(`Connection successful at port ${port}`);
});
