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

async function startApp() {
	try {
		const todo = await inquirer.prompt([
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
					"EXIT APP",
				],
			},
		]);
		const { selection } = todo;
		// .then(({ selection }) => {
		switch (selection) {
			case "View all Employees":
				await routes.viewEmployees();
				await startApp();
				break;
			case "View all Employees by Department":
				routes.viewEmployeesByDept();
				startApp();
				break;
			case "View all Employees by Role":
				routes.viewEmployeesByRole();
				startApp();
				break;
			case "Add Employee":
				await routes.addEmployee();
				await startApp();
				break;
			case "Add Department":
				routes.addDepartment();
				startApp();
				break;
			case "Add Role":
				routes.addRole();
				startApp();
				break;
			case "Remove Employee":
				routes.removeEmployee();
				startApp();
				break;
			case "Update Employee Role":
				routes.updateRole();
				startApp();
				break;
			case "Update Manager":
				routes.updateManager();
				startApp();
				break;
			case "Update Employee Manager":
				routes.updateEmployeeManager();
				startApp();
				break;
			case "EXIT APP":
				routes.endApp();
				break;
		}
		return selection;
		// });
	} catch (err) {
		throw err;
	}
}

connection.connect(function (err) {
	if (err) throw err;
	startApp();
	connection.end();
});
