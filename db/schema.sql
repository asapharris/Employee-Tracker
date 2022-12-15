DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE employee_role(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  dept_id INT 
  FOREIGN KEY (dept_id)
  REFERENCES department(id)
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT FOREIGN KEY
  manager_id INT FOREIGN KEY
  FOREIGN KEY (manager_id) REFERENCES employee(id)
  FOREIGN KEY (role_id) REFERENCES employee_role(id)
  ON DELETE SET NULL
);