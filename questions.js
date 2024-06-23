const inquirer = require('inquirer');

const mainMenu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);
};

const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    }
  ]);
};

const addRolePrompt = async (departments) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department:',
      choices: departments.map(department => ({
        name: department.name,
        value: department.id
      }))
    }
  ]);
};

const addEmployeePrompt = async (roles, managers) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee last name:'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role:',
      choices: roles.map(role => ({
        name: role.title,
        value: role.id
      }))
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager:',
      choices: [
        { name: 'None', value: null },
        ...managers.map(manager => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id
        }))
      ]
    }
  ]);
};

const updateEmployeeRolePrompt = async (employees, roles) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee:',
      choices: employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role:',
      choices: roles.map(role => ({
        name: role.title,
        value: role.id
      }))
    }
  ]);
};

module.exports = {
  mainMenu,
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
};
