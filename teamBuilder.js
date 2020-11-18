// Dependencies
// =============================================================
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

// Sets up MySQL connection
// =============================================================
var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // Username
  user: "root",

  // Password
  password: process.env.DB_password,
  database: "team_DB"
});

// Starts the server to begin listening
// =============================================================
connection.connect(function(err) {
  if (err) throw err;
  runPrompt();
});

// Main inquiry set for choosing to manage employees, roles or departments
// =============================================================
function runPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to manage?",
      choices: [
        "Manage Employees",
        "Manage Roles",
        "Manage Departments",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Manage Employees":
        manageEmployees();
        break;

      case "Manage Roles":
        manageRoles();
        break;

      case "Manage Departments":
        manageDepartments();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

// Inquiry for choosing option to manage employees
// =============================================================
function manageEmployees() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "Add Employee",
        //"Remove Employee",
        "Update Employee role",
        //"Update Employee manager",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all Employees":
        employeeView();
        break;

      case "Add Employee":
        employeeAdd();
        break;

      case "Update Employee role":
        updateRole();
        break;

     //   case "Remove Employee":
    //     employeeSelect();
    //     //action or function to remove employee
    //     break;

    // case "View all Employees by department":
    //   departmentView();
    //   break;

    //   case "View all Employees by manager":
    //     managerView();
    //     break;

    //   case "Update Employee manager": 
    //     updateManager();
    //     break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

// Inquiry for viewing all employees
// =============================================================
function employeeView() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res){
      if (err) throw err;
      console.table(res);
      runPrompt();
    });
}

// Inquiry for adding an employee
// =============================================================
function employeeAdd() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employee's role #?",
      },
      // {
      //   name: "role",
      //   type: "input",
      //   message: "Who is the employee's manager?",
      // }
    ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.role,
          },
          function (err) {
            if (err) throw err;
            console.log("succeefully added new employee");
            runPrompt();
          }
        );
      });
}

// Inquiry for updating an employee's role
// =============================================================
function updateRole() {
    inquirer
      .prompt([
        {
          name: "employeeChoice",
          type: "input",
          message: "Which employee would you like to update?"
        },
        {
        name: "roleChoice",
        type: "input",
        message: "What is the employee's new role?",
      },
      ])
      .then(function(answer) {
        connection.query (
          "UPDATE employee SET ? WHERE ?", 
          [
            {
              role_id: answer.roleChoice
            },
            {
              first_name: answer.employeeChoice,
            }
          ], 
          function (err){
          if (err) throw err;
          console.log("succeefully updated employee's role");
          runPrompt();
        });
        });
      }

// // Inquiry for viewing all employees by department
// // =============================================================
// function departmentView() 

// // Inquiry for viewing all employees by manager
// // =============================================================
// function managerView() 

// // Inquiry for removing an employee
// // =============================================================
// function employeeSelect() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "rawlist",
//       message: "Which employee would you like to remove?",
//       choices: [
//         "option placeholder",
//       ]
//     })

// // Inquiry for updating an employee's manager
// // =============================================================
// function updateManager() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "Who is the employee's new manager?",
//         choices: [
//           "option placeholder",
//         ]
//       })
// 

// Inquiry for choosing option to manage roles
// =============================================================
function manageRoles() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all roles",
        "Add role",
        //"Remove role",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all roles":
        roleView();
        break;

      case "Add role":
        roleAdd();
        break;

    //   case "Remove role":
    //     roleRemove();
    //     break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

// Inquiry for viewing all roles
// =============================================================
function roleView() {
  let query = "SELECT * FROM roles";
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
}

// Inquiry for adding a role
// =============================================================
function roleAdd() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      // {
      //   name: "department_id",
      //   type: "input",
      //   message: "What is the role's department #?",
      // },
    ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            // department_id: answer.department_id,
          },
          function (err) {
            if (err) throw err;
            console.log("succeefully added new role");
            runPrompt();
          }
        );
      });
}

// Inquiry for choosing option to manage departments
// =============================================================
function manageDepartments() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add department",
        //"Remove department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all departments":
        departmentView();
        break;

      case "Add department":
        departmentAdd();
        break;

    //   case "Remove department":
    //     departmentRemovet();
    //     break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

// Inquiry for viewing all departments
// =============================================================
function departmentView() {
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
}

// Inquiry for adding a department
// =============================================================
function departmentAdd() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name_: answer.department_name,
          },
          function (err) {
            if (err) throw err;
            console.log("succeefully added new department");
            runPrompt();
          }
        );
      });
}
