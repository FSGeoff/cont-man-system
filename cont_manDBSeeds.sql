DROP DATABASE IF EXISTS cont_manDB;

CREATE DATABASE cont_manDB;

USE cont_manDB;

CREATE TABLE department(
id INT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);
INSERT INTO department(id, name)
VALUES(2413, "Engineer");
INSERT INTO department(id, name)
VALUES(2418, "HR Manager");
INSERT INTO department(id, name)
VALUES(2411, "Developer");
INSERT INTO department(id, name)
VALUES(2415, "Architect");
INSERT INTO department(id, name)
VALUES(2412, "QA/BA Admin");
INSERT INTO department(id, name)
VALUES(2410, "Jr Developer");
INSERT INTO department(id, name)
VALUES(2419, "Intern");
INSERT INTO department(id, name)
VALUES(2416, "Marketing Manager");
INSERT INTO department(id, name)
VALUES(2414, "Manager");
INSERT INTO department(id, name)
VALUES(5000, "Office Manager");


SELECT * FROM department;

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary INT(10) NOT NULL,
departmentId INT(10),  -- holds reference to depertment role
PRIMARY KEY(id)
);

INSERT INTO role(title, salary, departmentId)
VALUES("Marketing Manager", 105000, 2416);

INSERT INTO role(title, salary, departmentId)
VALUES("Engineer", 90000, 2413);
INSERT INTO role(title, salary, departmentId)
VALUES("HR Manager", 65000, 2418);
INSERT INTO role(title, salary, departmentId)
VALUES("Developer", 120000, 2411);
INSERT INTO role(title, salary, departmentId)
VALUES("Architect", 18000, 2415);
INSERT INTO role(title, salary, departmentId)
VALUES("Administrative", 75000, 2410);
INSERT INTO role(title, salary, departmentId)
VALUES("BA/QA Admin", 72000, 2412);
INSERT INTO role(title, salary, departmentId)
VALUES("Jr Developer", 75000, 2410);
INSERT INTO role(title, salary, departmentId)
VALUES("Intern", 35000, 2419);
INSERT INTO role(title, salary, departmentId)
VALUES("Manager", 110000, 2414);
INSERT INTO role(title, salary, departmentId)
VALUES("Office Manager", 150000, 5000);
INSERT INTO role(title, salary, departmentId)
VALUES("Developer Manager", 180000, 6000);


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
SELECT * FROM employee WHERE manager_id = 2414;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tom", "Brown", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tim", "Brown", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tommy", "Brown", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Bill", "Hill", 2418, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Jill", "Hill", 2418, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Phil", "Hill", 2418, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Alfred", "Hill", 2418, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Benjamen", "Buttons", 2411, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Leon", "Jackson", 2411, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tory", "Schieder", 2411, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Hortence", "Blewstack", 2411, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Iniko", "Nix", 2415, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kiara", "Nix", 2415, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Gyasi", "Nix", 2415, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Daath", "Nix", 2415, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Paul", "Wall", 2414, 0000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Rod", "Temperton", 2419, 2414);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("JJ", "Fadd", 2419, 2414);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Ron", "Thomas", 2419, 2414);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kesha", "Bellman", 2419, 2414);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Kirby", "Flash", 5000, 0000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Shawn", "Harris", 2412, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Sarah", "Bellman", 2412, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tasha", "Smith", 2412, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Shawn", "Austin", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Ken", "Haygood", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Diane", "Belcher", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Reinhold", "Peirson", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Joe", "Brown", 2413, 5000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Joe", "Fisher", 6000, 6000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Harvey", "Wallbanger", 2410, 6000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Tim", "Thomas", 2410, 6000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Charles", "Sykes", 2410, 6000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Michael", "Chi", 2410, 6000);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Christopher", "Wallacw", 2410, 6000);



SELECT * FROM employee;