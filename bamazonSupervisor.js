var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//Setting the DB parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mysql@123",
    database: "bamazonDB"
});

// If Error display error else call the runAction function to to provide options to the SuperVisor
connection.connect(function (err) {
    if (err) throw err;
    runAction();
});

// Function to give the supervisor options
function runAction() {

    inquirer.prompt({
        name: "options",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]

    }).then(function (answer) {
        switch (answer.options) {
            // Display Sales by Department
            case "View Product Sales by Department":
                displaydeptSales();
                break;
            case "Create New Department":
                // Add a new Department
                addDepartment();
                break;

        }
    });


}