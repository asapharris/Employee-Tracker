INSERT INTO department (dept_name)
VALUES 
('Sales'),
('Accounting'),
('Customer Services'),
('Quality Assurance');

INSERT INTO employee_role (title, salary, dept_id)
VALUES
('Regional Manager', 180000, 1),
('Assitant Regional Manager', 120000, 1),
('Accountant', 100000, 2), 
('Assistant to the RM', 80000, 1),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 150000, 2),
('QA Rep', 70000, 3),
('Customer Service Rep', 60000, 3);


INSERT INTO employee (first_name, last_name)
VALUES 
('Dwight', 'Schrute'),
('Jim', 'Halpert'),
('Stanley', 'Hudson'),
('Pam', 'Beesly'),
('Oscar', 'Martinez'),
('Creed', 'Bratton'),
('Kevin', 'Malone'),
('Kelly', 'Kapoor');
       