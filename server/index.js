const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
const passport = require("./utils/passportConfig");
const port = process.env.PORT || 5000;

//middleware function
app.use(cors());
app.use(express.json());

// Passport initialization
app.use(passport.initialize());

//Routes
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const oauthRoutes = require("./routes/oauth.routes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/auth", oauthRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
