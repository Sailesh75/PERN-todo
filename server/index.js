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
  } catch (error) {
    console.log(error);
  }
});

//get a todo

//update a todo

//delete a todo

//delete all todos

app.listen(5000, () => {
  console.log(`Connection successful at port ${port}`);
});
