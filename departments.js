const mysql = require("mysql");
const inquirer = require("inquirer");
const employees = require("./employees");
const role = require("./role");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "7Streams!",
	database: "cont_manDB",
});

function addDepartment() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter a Department ID number(4 digits)",
				name: "department_id",
			},
			{
				type: "input",
				message: "Please enter a Department",
				name: "department",
			},
		])
		.then((answer) => {
			const { department_id, department } = answer;
			let query = "INSERT INTO department(id, name)VALUES(?, ?);";
			connection.query(query, [department_id, department], (err, res) => {
				if (err) throw err;
				console.table(res);
				viewDepartments();
				reStartApp();
			});
		});
}

function viewDepartments() {
	query = "SELECT * FROM department;";
	connection.query(query, (err, res) => {
		if (err) throw err;
        console.table(res);
        reStartApp();
	});
}

function reStartApp() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "What else would you like to do?",
				name: "selection",
				choices: [
					"View all Employees",
					"View all Employees by Department",
					"View all Employees by Role",
					"Add Employee",
					"Add Department",
					"Add Role",
					"Remove Employee",
					"Update Employee Role",
					"Update Manager",
					"Update Employee Manager",
					"View Departments",
					"View Payroll",
					"EXIT THE APP",
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
					addDepartment();
					break;
				case "Add Role":
					role.addRole();
					break;
				case "Remove Employee":
					employees.removeEmployee();
					break;
				case "View Departments":
					viewDepartments();
					break;
				case "View Payroll":
					role.payRoll();
					break;
				// case "Update Employee Role":
				// 	role.updateRole();
				// 	break;
				// case "Update Manager":
				// 	updateManager();
				// 	break;
				// case "Update Employee Manager":
				// 	updateEmployeeManager();
				// 	break;
				case "EXIT THE APP":
					endApp();
					break;
			}
		});
}

function endApp() {
	connection.end();
}

module.exports = {
	viewDepartments,
	addDepartment,
	reStartApp,
	endApp,
};
