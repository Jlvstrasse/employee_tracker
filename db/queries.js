const inquirer = require('inquirer');
const questions = require('../questions');

const viewAllDepartments = async (pool) => {
  const res = await pool.query('SELECT * FROM department');
  console.table(res.rows);
};

const viewAllRoles = async (pool) => {
  const res = await pool.query('SELECT role.id, title, salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
  console.table(res.rows);
};

const viewAllEmployees = async (pool) => {
  const res = await pool.query(`SELECT employee.id, first_name, last_name, role.title AS job_title, department.name AS department, salary, 
  (SELECT CONCAT(first_name, ' ', last_name) FROM employee AS manager WHERE employee.manager_id = manager.id) AS manager
  FROM employee 
  JOIN role ON employee.role_id = role.id 
  JOIN department ON role.department_id = department.id`);
  console.table(res.rows);
};

const addDepartment = async (pool) => {
  const { name } = await inquirer.prompt(questions.addDepartment);
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added department ${name}`);
};

const addRole = async (pool) => {
  const departments = await pool.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map(({ id, name }) => ({ name, value: id }));

  const { title, salary, department_id } = await inquirer.prompt([
    questions.addRole.title,
    questions.addRole.salary,
    { ...questions.addRole.department_id, choices: departmentChoices }
  ]);

  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added role ${title}`);
};

const addEmployee = async (pool) => {
  const roles = await pool.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({ name: title, value: id }));

  const employees = await pool.query('SELECT * FROM employee');
  const managerChoices = employees.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
  managerChoices.unshift({ name: 'None', value: null });

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    questions.addEmployee.first_name,
    questions.addEmployee.last_name,
    { ...questions.addEmployee.role_id, choices: roleChoices },
    { ...questions.addEmployee.manager_id, choices: managerChoices }
  ]);

  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log(`Added employee ${first_name} ${last_name}`);
};

const updateEmployeeRole = async (pool) => {
  const employees = await pool.query('SELECT * FROM employee');
  const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

  const roles = await pool.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({ name: title, value: id }));

  const { employee_id, role_id } = await inquirer.prompt([
    { ...questions.updateEmployeeRole.employee_id, choices: employeeChoices },
    { ...questions.updateEmployeeRole.role_id, choices: roleChoices }
  ]);

  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log(`Updated employee's role`);
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
