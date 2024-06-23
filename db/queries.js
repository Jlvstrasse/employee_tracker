const pool = require('./connection');

const retrieveDepartments = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM department', (error, result) => {
      if (error) {
        console.error('Error retrieving departments:', error);
        reject(error);
      } else {
        resolve(result ? result.rows : []);
      }
    });
  });
};

const retrieveRoles = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT role.id AS role_id, role.title, role.salary, role.department_id, 
              employee.id AS employee_id, employee.first_name, employee.last_name, 
              employee.role_id AS employee_role_id, employee.manager_id 
       FROM role 
       LEFT JOIN employee ON role.id = employee.role_id`,
      (error, result) => {
        if (error) {
          console.error('Error retrieving roles:', error);
          reject(error);
        } else {
          resolve(result ? result.rows : []);
        }
      }
    );
  });
};

module.exports = { retrieveDepartments, retrieveRoles };
