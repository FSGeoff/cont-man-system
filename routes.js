const mysql = require("mysql");
const inquirer = require("inquirer");

function viewEmployees() {
	console.log("View Employees here!");
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

module.exports = {
	viewEmployees,
	viewEmployeesByDept,
	addEmployee,
	removeEmployee,
	updateRole,
	updateManager,
	updateEmployeeManager,
};
