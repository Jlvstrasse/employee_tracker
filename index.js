const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/queries');

const mainMenu = async () => {
  const answers = await inquirer.prompt([
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

  switch (answers.action) {
    case 'View all departments':
      const departments = await getDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await getRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await getEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
      });
      await addDepartment(departmentName.name);
      console.log(`Department "${departmentName.name}" added successfully.`);
      break;
    case 'Add a role':
      const roleData = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the role salary:' },
        { type: 'input', name: 'department_id', message: 'Enter the department ID:' }
      ]);
      await addRole(roleData.title, roleData.salary, roleData.department_id);
      console.log(`Role "${roleData.title}" added successfully.`);
      break;
    case 'Add an employee':
      const employeeData = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter the employee first name:' },
        { type: 'input', name: 'last_name', message: 'Enter the employee last name:' },
        { type: 'input', name: 'role_id', message: 'Enter the role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter the manager ID (or leave blank):' }
      ]);
      await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id || null);
      console.log(`Employee "${employeeData.first_name} ${employeeData.last_name}" added successfully.`);
      break;
    case 'Update an employee role':
      const updateData = await inquirer.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter the employee ID:' },
        { type: 'input', name: 'role_id', message: 'Enter the new role ID:' }
      ]);
      await updateEmployeeRole(updateData.employee_id, updateData.role_id);
      console.log(`Employee ID "${updateData.employee_id}" role updated successfully.`);
      break;
    case 'Exit':
      process.exit();
      break;
  }

  mainMenu();
};

mainMenu();
