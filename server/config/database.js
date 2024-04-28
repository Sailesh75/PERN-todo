const { Sequelize } = require("sequelize");

const db = new Sequelize("perntodo", "postgres", "myadminql", {
  host: "localhost",
  dialect: "postgres",
});

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
