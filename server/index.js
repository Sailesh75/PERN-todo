const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//database
const db = require("./config/database");

//model
const Todo = require("./models/Todo");

//middleware function
app.use(cors());
app.use(express.json()); //gives excess to request.body which helps to get data from the client

app.get("/", async (req, res) => {
  res.status(200).send("Landing Page");
});

//Routes
app.use("/api", require("./routes/todo"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
