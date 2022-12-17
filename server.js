const mysql = require('mysql2')
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`),
    employee_tracker()
);

function employee_tracker() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                'EXIT'
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'EXIT':
                    exitApp();
                    break;
                default:
                    break;
            }
        })
};

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        employee_tracker();
    })
};

function viewDepartments() {
    var query = 'SELECT * FROM department';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        employee_tracker();
    })
};

function viewRoles() {
    var query = 'SELECT * FROM employee_role';
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        employee_tracker();
    })
};

function addEmployee() {
    db.query('SELECT * FROM employee_role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name? "
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function () {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employee's role? "
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)}
                }
                db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        employee_tracker();
                    })
            })
    })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer) {
            db.query(
                'INSERT INTO department SET ?',
                {
                    dept_name: answer.newDepartment
                });
            var query = 'SELECT * FROM department';
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                employee_tracker();
            })
        })
};

function addRole() {
    db.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'new_role',
                    type: 'input',
                    message: "What new role would you like to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role? (Enter a number)'
                },
            ]).then(function (answer) {
                let dept_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.Department) {
                        dept_id = res[a].id;
                    }
                }
                db.query(
                    'INSERT INTO employee_role SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        dept_id: dept_id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Your new role has been added!');
                        console.table('All Roles:', res);
                        employee_tracker();
                    })
            })
    })
};

function updateRole() {
};

function deleteEmployee() {
};

function exitApp() {
    db.end();
};
