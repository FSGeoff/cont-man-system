DROP DATABASE IF EXISTS cont_manDB;

CREATE DATABASE cont_manDB;

USE cont_manDB;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary INT(10) NOT NULL,
departmentId INT(10),  -- holds reference to depertment role
PRIMARY KEY(id)
);

INSERT INTO role(title, salary, departmentId)
VALUES("Engineer", 90000, 2413);
INSERT INTO role(title, salary, departmentId)
VALUES("HR Manager", 65000, 2418);
INSERT INTO role(title, salary, departmentId)
VALUES("Developer", 12000, 2411);
INSERT INTO role(title, salary, departmentId)
VALUES("Architect", 18000, 2415);
INSERT INTO role(title, salary, departmentId)
VALUES("Administrative", 75000, 2410);

SELECT * FROM Role;

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT(10), -- INT to hold reference to role employee has
manager_id INT(10), -- INT to hold reference to another employee 
					-- that manages the employee being Created. 
                    -- This field may be null if the employee has no manager
PRIMARY KEY(id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Mavis", "Davis", 2413, 2500);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Bill", "Hill", 2418, 3500);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Benjamen", "Buttons", 2411, 4500);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Iniko", "Nix", 2415, 5500);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Inity", "Nix", 2410, 6500);

SELECT * FROM employee;