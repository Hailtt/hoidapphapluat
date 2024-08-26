require("dotenv").config();
const Pool = require("pg-pool");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgresSQL Successfully!");
});

module.exports = pool;
