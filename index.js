require('dotenv').config();
const inquirer = require('inquirer');
const { Pool } = require('pg');
const queries = require('./db/queries'); // Ensure this path is correct
const questions = require('./questions');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const mainMenu = async () => {
  const { action } = await inquirer.prompt(questions.mainMenu);
  switch(action) {
    case 'View all departments':
      await queries.viewAllDepartments(pool);
      break;
    case 'View all roles':
      await queries.viewAllRoles(pool);
      break;
    case 'View all employees':
      await queries.viewAllEmployees(pool);
      break;
    case 'Add a department':
      await queries.addDepartment(pool);
      break;
    case 'Add a role':
      await queries.addRole(pool);
      break;
    case 'Add an employee':
      await queries.addEmployee(pool);
      break;
    case 'Update an employee role':
      await queries.updateEmployeeRole(pool);
      break;
    case 'Exit':
      pool.end();
      process.exit();
  }
  mainMenu();
};

mainMenu();

