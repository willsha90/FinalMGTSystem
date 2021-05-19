use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 15400, 1),
    ('Salesperson', 30000, 1),
    ('Lead Engineer', 155660, 2),
    ('Software Engineer', 88000, 2),
    ('Account Manager', 47000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 30000, 4),
    ('Lawyer', 87000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Betty', 'White', 1, NULL),
    ('Jim', 'Chandler', 2, 1),
    ('Gus', 'Gleason', 3, NULL),
    ('Kevin', 'James', 4, 3),
    ('Brian', 'Kemp', 5, NULL),
    ('Smith', 'Lord', 6, 5),
    ('Theirry', 'Henry', 7, NULL),
    ('Allen', 'Brady', 8, 7);
