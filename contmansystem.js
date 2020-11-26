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
					reStartApp();
					console.log(res.affectedRows + " row(s) removed");
				}
			);
		});
}

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
					viewRoles();
					reStartApp();
				}
			);
		});
}

function updateSalary() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What's the new salary?",
				name: "newSal",
			},
			{
				type: "input",
				message: "What title is being updated?",
				name: "title",
			},
		])
		.then((answer) => {
			const { newSal, title } = answer;
			let query = "UPDATE role SET salary = ? WHERE title = ?;";
			connection.query(query, [newSal, title], (err, res) => {
				if (err) throw err;
				viewRoles();
			});
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

function addDepartment() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter a Department ID number",
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
					"Remove Employee",
					"Add Department",
					"Add Role",
					"Remove Role",
					"Update Salary",
					"View all Roles",
					"View Departments",
					"View Payroll",
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
				case "Remove Role":
					removeRole();
					break;
				case "Update Salary":
					updateSalary();
					break;
				case "Remove Employee":
					removeEmployee();
					break;
				case "View all Roles":
					viewRoles();
					break;
				case "View Departments":
					viewDepartments();
					break;
				case "View Payroll":
					payRoll();
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
	viewEmployeesByRole,
	addEmployee,
	removeEmployee,
	viewDepartments,
	addDepartment,
	viewRoles,
	removeRole,
	updateSalary,
	addRole,
	payRoll,
};
