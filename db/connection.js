require('dotenv').config();
const { Pool } = require('pg');

const databasePool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log('Connected to the employee_management database.');

module.exports = databasePool;

