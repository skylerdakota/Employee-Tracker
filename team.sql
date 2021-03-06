DROP DATABASE IF EXISTS team_DB;
CREATE database team_DB;

USE team_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT, 
  name_ VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  -- department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  -- manager_id INT NOT NUll,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;