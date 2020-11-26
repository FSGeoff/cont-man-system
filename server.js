// Required Packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

//Console Artwork
figlet("Cont-Man-System", function (err, data) {
	if (err) {
		console.log("Something went wrong...");
		console.dir(err);
		return;
	}
	console.log(data);
});

//sql connection
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "7Streams!",
	database: "cont_manDB",
});

//App starts here
async function startApp() {
	try {
		const answer = await inquirer.prompt([
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
					"EXIT APP",
				],
			},
		]);
		const { selection } = answer;
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
			case "View all Roles":
				viewRoles();
				break;
			case "View Departments":
				viewDepartments();
				break;
			case "Remove Employee":
				removeEmployee();
				break;
			case "View Payroll":
				payRoll();
				break;
			case "Remove Role":
				removeRole();
			case "Update Salary":
				updateSalary();
				break;
			case "EXIT APP":
				connection.end();
				break;
		}
	} catch (err) {
		throw err;
	}
}

//View Employess
function viewEmployees() {
	let query = "SELECT * FROM employee;";
	connection.query(query, function (err, res) {
		if (err) throw err;

		console.table(res);
		startApp();
	});
}

//View Employees by Department
async function viewEmployeesByDept() {
	try {
		const answer = await inquirer
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
					startApp();
				});
			});
	} catch {
		throw err;
	}
}

//View Employees by Role
async function viewEmployeesByRole() {
	try {
		const answer = await inquirer.prompt([
			{
				type: "input",
				message:
					"Please enter the employee role you would like to view.",
				name: "roleTitle",
			},
		]);
		const { roleTitle } = answer;
		connection.query(
			"SELECT  role.title, employee.first_name, employee.last_name,  role.salary FROM employee INNER JOIN role WHERE role.title = ?",
			[roleTitle],
			(err, res) => {
				if (err) throw err;
				console.table(res);
				startApp();
			}
		);
	} catch (err) {
		throw err;
	}
}

// Add Employee
async function addEmployee() {
	try {
		const answer = await inquirer.prompt([
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
		]);

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
				startApp();
			}
		);
	} catch (err) {
		throw err;
	}
}

//Remove Employee
async function removeEmployee() {
	try {
		inquirer.prompt([
			{
				type: "input",
				message:
					"Please input the last name of the employee you would like to delete.",
				name: "last_name",
			},
		]);

		const { last_name } = answer;
		connection.query(
			"DELETE FROM employee WHERE last_name = ?",
			[last_name],
			(err, res) => {
				if (err) throw err;
				viewEmployees();
				startApp();
				console.log(res.affectedRows + " row(s) removed");
			}
		);
	} catch (err) {
		throw err;
	}
}

//View Roles
function viewRoles() {
	let query = "SELECT * FROM role;";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		startApp();
	});
}

//Remove Role
async function removeRole() {
	try {
		const answer = await inquirer.prompt([
			{
				type: "input",
				message: "What role would you like to remove?",
				name: "removeRole",
			},
		]);

		const { removeRole } = answer;
		query = "DELETE FROM role WHERE title = ?;";
		connection.query(query, [removeRole], (err, res) => {
			if (err) throw err;
			viewRoles();
			startApp();
		});
	} catch (err) {
		throw err;
	}
}
//Add Role
async function addRole() {
	try {
		const answer = await inquirer.prompt([
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
		]);

		const { title, salary, department_id } = answer;
		let query =
			"INSERT INTO role(title, salary, departmentId)VALUES(?, ?, ?);";
		connection.query(query, [title, salary, department_id], (err, res) => {
			if (err) throw err;
			console.table(res);
			viewRoles();
			startApp();
		});
	} catch (err) {
		throw err;
	}
}

//Update Salary
async function updateSalary() {
	try {
		const answer = await inquirer.prompt([
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
		]);

		const { newSal, title } = answer;
		let query = "UPDATE role SET salary = ? WHERE title = ?;";
		connection.query(query, [newSal, title], (err, res) => {
			if (err) throw err;
			viewRoles();
		});
	} catch (err) {
		throw err;
	}
}

//Payroll
async function payRoll() {
	try {
		const answer = await inquirer.prompt([
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
		]);

		const { payroll } = answer;
		let query =
			"SELECT  title, SUM(salary) AS total_payroll FROM employee FULL JOIN role WHERE title = ?;";
		connection.query(query, [payroll], (err, res) => {
			if (err) throw err;
			console.table(res);
			startApp();
		});
	} catch (err) {
		throw err;
	}
}

//Add Department
async function addDepartment() {
	try {
		const answer = await inquirer.prompt([
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
		]);

		const { department_id, department } = answer;
		let query = "INSERT INTO department(id, name)VALUES(?, ?);";
		connection.query(query, [department_id, department], (err, res) => {
			if (err) throw err;
			console.table(res);
			viewDepartments();
			startApp();
		});
	} catch (err) {
		throw err;
	}
}

//View Departments
function viewDepartments() {
	query = "SELECT * FROM department;";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		startApp();
	});
}

//Exit App
function exitApp() {
	connection.end();
}
connection.connect(function (err) {
	if (err) throw err;
	startApp();
});
