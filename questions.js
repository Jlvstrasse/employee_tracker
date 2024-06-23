const inquirer = require('inquirer');
const { retrieveDepartments, retrieveRoles } = require('./db/queries');
const { consoleTable } = require('console.table');

const promptMainMenu = async () => {
  const { option } = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Select an option:',
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

  return option;
};

const viewDepartments = async () => {
  try {
    const departments = await retrieveDepartments();
    consoleTable(departments);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
  await startApp();
};

const viewRoles = async () => {
  try {
    const roles = await retrieveRoles();
    consoleTable(roles);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
  await startApp();
};

// Define other handlers similar to viewDepartments and viewRoles

const startApp = async () => {
  const action = await promptMainMenu();

  switch (action) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    // Add cases for other actions and corresponding handlers
    default:
      console.log('Goodbye!');
      process.exit();
  }
};

startApp();

