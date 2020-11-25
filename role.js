const mysql = require("mysql");
const inquirer = require("inquirer");
const departments = require("./departments");
const employees = require("./employees");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "7Streams!",
	database: "cont_manDB",
});

function viewRoles() {
	let query = "SELECT * FROM role;";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		reStartApp();
	});
}

function removeRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What role would you like to remove?",
				name: "removeRole",
			},
		])
		.then((answer) => {
			const { removeRole } = answer;
			query = "DELETE FROM role WHERE title = ?;";
			connection.query(query, [removeRole], (err, res) => {
				if (err) throw err;
				viewRoles();
				reStartApp();
			});
		});
}

function addRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter a title",
				name: "title",
			},
			{
				type: "input",
				message: "Please enter a salary",
				name: "salary",
			},
			{
				type: "input",
				message: "Please enter a Department ID",
				name: "department_id",
			},
		])
		.then((answer) => {
			const { title, salary, department_id } = answer;
			let query =
				"INSERT INTO role(title, salary, departmentId)VALUES(?, ?, ?);";
			connection.query(
				query,
				[title, salary, department_id],
				(err, res) => {
					if (err) throw err;
					console.table(res);
					viewEmployees();
					reStartApp();
				}
			);
		});
}

function payRoll() {
	inquirer
		.prompt([
			{
				type: "list",
				message:
					"Please select a position and the total payroll for that position will be displayed",
				name: "payroll",
				choices: [
					"Senior Developer",
					"BA/QA Admin",
					"Jr Developer",
					"Intern",
					"Marketing Manager",
					"Architect",
					"Engineer",
					"Manager",
					"Office Manager",
					"Developer Manager",
					"HR Manager",
					"Office Assistant",
				],
			},
		])
		.then((answer) => {
			const { payroll } = answer;
			let query =
				"SELECT  title, SUM(salary) AS total_payroll FROM employee FULL JOIN role WHERE title = ?;";
			connection.query(query, [payroll], (err, res) => {
				if (err) throw err;
				console.table(res);
				reStartApp();
			});
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
					departments.addDepartment();
					break;
				case "Add Role":
					addRole();
					break;
				case "Remove Employee":
					employees.removeEmployee();
					break;
				case "View Departments":
					departments.viewDepartments();
					break;
				case "View Payroll":
					payRoll();
					break;

				// case "Update Employee Role":
				// 	updateRole();
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
	viewRoles,
	removeRole,
	addRole,
	payRoll,
	reStartApp,
	endApp,
};
