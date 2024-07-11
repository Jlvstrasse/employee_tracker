-- Insert sample data into department
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

-- Insert sample data into role
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Accountant', 60000, 2),
('HR Manager', 70000, 3);

-- Insert sample data into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Mark', 'Johnson', 3, NULL);
