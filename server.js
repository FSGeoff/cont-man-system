const mysql = require("mysql");
const inquirer = require("inquirer");
const routes = require("./routes");

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
					"Update Employee Role",
					"Update Manager",
					"Update Employee Manager",
				],
			},
		])
		.then(({ selection }) => {
			switch (selection) {
				case "View all Employees":
					routes.viewEmployees();
					break;
				case "View all Employees by Department":
					routes.viewEmployeesByDept();
					break;
				case "View all Employees by Role":
					routes.viewEmployeesByRole();
					break;
				case "Add Employee":
					routes.addEmployee();
					break;
				case "Add Department":
					routes.addDepartment();
					break;
				case "Add Role":
					routes.addRole();
					break;
				case "Remove Employee":
					routes.removeEmployee();
					break;
				case "Update Employee Role":
					routes.updateRole();
					break;
				case "Update Manager":
					routes.updateManager();
					break;
				case "Update Employee Manager":
					routes.updateEmployeeManager();
					break;
			}
		});
}

connection.connect(function (err) {
	if (err) throw err;
	startApp();
	connection.end();
});
