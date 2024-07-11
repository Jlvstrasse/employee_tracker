module.exports = {
    mainMenu: {
      name: 'action',
      type: 'list',
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
    },
    addDepartment: {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    },
    addRole: {
      title: {
        name: 'title',
        type: 'input',
        message: 'Enter the role title:'
      },
      salary: {
        name: 'salary',
        type: 'input',
        message: 'Enter the role salary:'
      },
      department_id: {
        name: 'department_id',
        type: 'list',
        message: 'Select the department for this role:'
      }
    },
    addEmployee: {
      first_name: {
        name: 'first_name',
        type: 'input',
        message: 'Enter the employee\'s first name:'
      },
      last_name: {
        name: 'last_name',
        type: 'input',
        message: 'Enter the employee\'s last name:'
      },
      role_id: {
        name: 'role_id',
        type: 'list',
        message: 'Select the employee\'s role:'
      },
      manager_id: {
        name: 'manager_id',
        type: 'list',
        message: 'Select the employee\'s manager:'
      }
    },
    updateEmployeeRole: {
      employee_id: {
        name: 'employee_id',
        type: 'list',
        message: 'Select the employee to update:'
      },
      role_id: {
        name: 'role_id',
        type: 'list',
        message: 'Select the new role:'
      }
    }
  };
  
  