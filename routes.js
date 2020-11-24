const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "7Streams!",
	database: "cont_manDB",
});

function viewEmployees() {
	let query = "SELECT * FROM employee;";
	connection.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
		reStartApp();
	});
}
function viewEmployeesByDept() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "Which Department would you like to search?",
				name: "departmentId",
				choices: ["2414", "5000", "6000"],
			},
		])
		.then((answer) => {
			let query =
				"SELECT * FROM employee WHERE manager_id = " +
				answer.departmentId;
			connection.query(query, function (err, res) {
				if (err) throw err;
				console.table(res);
				reStartApp();
			});
		});
}

function viewEmployeesByRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message:
					"Please enter the employee role you would like to view.",
				name: "roleTitle",
			},
		])
		.then(({ roleTitle }) => {
			connection.query(
				"SELECT  role.title, employee.first_name, employee.last_name,  role.salary FROM employee INNER JOIN role WHERE role.title = ?",
				[roleTitle],
				(err, res) => {
					if (err) throw err;
					console.table(res);
					reStartApp();
				}
			);
		});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter employee's first name.",
				name: "first_name",
			},
			{
				type: "input",
				message: "Please enter employee's last name.",
				name: "last_name",
			},
			{
				type: "list",
				message: "Please select from employee role IDs",
				name: "role_id",
				choices: [
					"2410",
					"2411",
					"2412",
					"2413",
					"2515",
					"2818",
					"2919",
				],
			},
			{
				type: "list",
				message: "Please select the appropriate manager",
				name: "manager_id",
				choices: ["2414", "5000", "6000"],
			},
		])
		.then((answer) => {
			const { first_name, last_name, role_id, manager_id } = answer;
			let query =
				"INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?, ?, ?, ?);";
			connection.query(
				query,
				[first_name, last_name, role_id, manager_id],
				function (err, res) {
					if (err) throw err;
					viewEmployees();
					console.log(res.affectedRows + "row(s) were inserted");
					reStartApp();
				}
			);
		});
}

function removeEmployee() {
	inquirer
		.prompt([
			{
				type: "input",
				message:
					"Please input the last name of the employee you would like to delete.",
				name: "last_name",
			},
		])
		.then((answer) => {
			const { last_name } = answer;
			connection.query(
				"DELETE FROM employee WHERE last_name = ?",
				[last_name],
				(err, res) => {
					if (err) throw err;
					viewEmployees();
					console.log(res.affectedRows + " row(s) removed");
				}
			);
		});
}

function updateRole() {
	console.log("update role here!");
}

function updateManager() {
	console.log("update manager here!");
}

function updateEmployeeManager() {
	console.log("update manager here!");
}
function addDepartment() {
	console.log("update dept here!");
}
function addRole() {
	console.log("update role here!");
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
					"EXIT THE APP",
				],
			},
		])
		.then(({ selection }) => {
			switch (selection) {
				case "View all Employees":
					viewEmployees();
					break;
				case "View all Employees by Department":
					viewEmployeesByDept();
					break;
				case "View all Employees by Role":
					viewEmployeesByRole();
					break;
				case "Add Employee":
					addEmployee();
					break;
				case "Add Department":
					addDepartment();
					break;
				case "Add Role":
					addRole();
					break;
				case "Remove Employee":
					removeEmployee();
					break;
				case "Update Employee Role":
					updateRole();
					break;
				case "Update Manager":
					updateManager();
					break;
				case "Update Employee Manager":
					updateEmployeeManager();
					break;
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
	viewEmployees,
	viewEmployeesByDept,
	addEmployee,
	removeEmployee,
	updateRole,
	updateManager,
	updateEmployeeManager,
	addDepartment,
	addRole,
	viewEmployeesByRole,
};
