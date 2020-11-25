const mysql = require("mysql");
const inquirer = require("inquirer");
const employees = require("./employees");
const role = require("./role");
const departments = require("./departments");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "7Streams!",
	database: "cont_manDB",
});

function startApp() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				name: "selection",
				choices: [
					"View all Employees",
					"View all Employees by Department",
					"View all Employees by Role",
					"Add Employee",
					"Add Department",
					"Add Role",
					"Remove Employee",
					"Remove Role",
					"View Departments",
					"View Payroll",
				],
			},
		])
		.then(({ selection }) => {
			switch (selection) {
				case "View all Employees":
					employees.viewEmployees();
					break;
				case "View all Employees by Department":
					employees.viewEmployeesByDept();
					break;
				case "View all Employees by Role":
					employees.viewEmployeesByRole();
					break;
				case "Add Employee":
					employees.addEmployee();
					break;
				case "Add Department":
					departments.addDepartment();
					break;
				case "Add Role":
					role.addRole();
					break;
				case "View Departments":
					departments.viewDepartments();
					break;
				case "Remove Employee":
					employees.removeEmployee();
					break;
				case "View Payroll":
					role.payRoll();
					break;
				// case "Update Employee Role":
				// 	role.updateRole();
				// 	break;
				// case "Update Manager":
				// 	routes.updateManager();
				// 	break;
				// case "Update Employee Manager":
				// 	routes.updateEmployeeManager();
				// 	break;
				case "Remove Role":
					role.removeRole();
			}
		});
}

connection.connect(function (err) {
	if (err) throw err;
	startApp();
	connection.end();
});
