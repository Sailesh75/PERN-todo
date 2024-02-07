// connect database and server in express
const { Pool } = require("pg");   //destructuring pg model to extract only the Pool object from it

const pool = new Pool({
  user: "postgres",
  password: "myadminql",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
