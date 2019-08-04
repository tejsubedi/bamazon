var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//Setting the DB parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mysql@123",
    database:"bamazonDB"
});

//Display all existing ProductDetails if DB connection is successful else display error

connection.connect(function(err){
    if(err) throw err;
    displayProductDetails();
});

