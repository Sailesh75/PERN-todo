const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { sequelize } = require("./models");

//middleware function
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Landing Page");
});

//Routes
app.use("/api", require("./routes/todo"));
app.use("/api", require("./routes/user"));
app.use("/auth",require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
