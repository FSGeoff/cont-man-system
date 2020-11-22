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
	console.log("View Employees by DEPT here!");
}

function addEmployee() {
	console.log("add EMP here!");
}

function removeEmployee() {
	console.log("remove EMP here!");
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
					"Add Employee",
					"Remove Employee",
					"Update Employee Role",
					"Update Manager",
					"Update Employee Manager",
				],
			},
		])
		.then(({selection}) => {
			switch (selection) {
				case "View all Employees":
					viewEmployees();
					break;
				case "View all Employees by Department":
					viewEmployeesByDept();
					break;
				case "Add Employee":
					addEmployee();
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
			}
		});
}

module.exports = {
	viewEmployees,
	viewEmployeesByDept,
	addEmployee,
	removeEmployee,
	updateRole,
	updateManager,
	updateEmployeeManager,
};
