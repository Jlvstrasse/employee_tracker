require('dotenv').config();
const { Pool } = require('pg');
const inquirer = require('inquirer');
const consoleTable = require('console.table'); 

const dbPool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

console.log('Connected to the employee_management database.');

const { retrieveDepartments, retrieveRoles } = require('./db/queries');

const mainMenuPrompt = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Update Employee Manager',
      'View Employees by Manager',
      'View Employees by Department',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'View Total Utilized Budget of Department',
    ],
  });

  return action;
};

const viewAllDepartments = async () => {
  try {
    const departments = await retrieveDepartments();
    consoleTable(departments);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
  await startApp();
};

const viewAllRoles = async () => {
  try {
    const roles = await retrieveRoles();
    consoleTable(roles);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
  await startApp();
};

// Defined other handlers similar to viewAllDepartments and viewAllRoles

const startApp = async () => {
  const action = await mainMenuPrompt();

  switch (action) {
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    // Added cases for other actions and corresponding handlers
    default:
      console.log('Goodbye!');
      process.exit();
  }
};

startApp();



