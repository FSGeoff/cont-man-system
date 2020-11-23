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
				server.startApp();
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
					server.startApp();
				}
			);
		});
}

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
		]);
		// .then((answer) => {
		const { first_name, last_name, role_id } = answer;
		let manager_id = "";
		switch (role_id) {
			case "2410":
				manager_id = 6000;
				break;
			case "2411":
				manager_id = 5000;
				break;
			case "2412":
				manager_id = 5000;
				break;
			case "2413":
				manager_id = 5000;
				break;
			case "2415":
				manager_id = 5000;
				break;
			case "2418":
				manager_id = 5000;
				break;
			case "2419":
				manager_id = 2414;
				break;
		}

		let query =
			"INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?, ?, ?, ?);";
		connection.query(
			query,
			[first_name, last_name, role_id, manager_id],
			function (err, res) {
				if (err) throw err;
				console.table(res);
			}
		);
		// });
	} catch (err) {
		throw err;
	}
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
		.then(({ last_name }) => {
			connection.query(
				"DELETE FROM employee WHERE last_name = ?",
				[last_name],
				(err, res) => {
					if (err) throw err;
					console.log(res.affectedRows + " row(s) removed");
					viewEmployees();
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
	endApp,
};
