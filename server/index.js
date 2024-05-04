const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//model
const { sequelize } = require("./models");

//middleware function
app.use(cors());
app.use(express.json()); //gives excess to request.body which helps to get data from the client

app.get("/", async (req, res) => {
  res.status(200).send("Landing Page");
});

//Routes
app.use("/api", require("./routes/todo"));
app.use("/api", require("./routes/user"));
app.use("/auth",require("./routes/jwtAuth"));

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
