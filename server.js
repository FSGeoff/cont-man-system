const mysql = require("mysql");
const inquirer = require("inquirer");
const contmansystem = require("./contmansystem");
const { viewRoles } = require("./contmansystem");

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
					"Remove Employee",
					"Add Department",
					"Add Role",
					"Remove Role",
					"Update Salary",
					"View all Roles",
					"View Departments",
					"View Payroll",
				],
			},
		])
		.then(({ selection }) => {
			switch (selection) {
				case "View all Employees":
					contmansystem.viewEmployees();
					break;
				case "View all Employees by Department":
					contmansystem.viewEmployeesByDept();
					break;
				case "View all Employees by Role":
					contmansystem.viewEmployeesByRole();
					break;
				case "Add Employee":
					contmansystem.addEmployee();
					break;
				case "Add Department":
					contmansystem.addDepartment();
					break;
				case "Add Role":
					contmansystem.addRole();
					break;
				case "View all Roles":
					contmansystem.viewRoles();
					break;
				case "View Departments":
					contmansystem.viewDepartments();
					break;
				case "Remove Employee":
					contmansystem.removeEmployee();
					break;
				case "View Payroll":
					contmansystem.payRoll();
					break;
				case "Remove Role":
					contmansystem.removeRole();
				case "Update Salary":
					contmansystem.updateSalary();
					break;
			}
		});
}

connection.connect(function (err) {
	if (err) throw err;
	startApp();
	connection.end();
});
