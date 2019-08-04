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

function displayProductDetails() {
    //Declaration of CLI table with column names
    var table = new Table ({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity','product_sales'],
        colWidths: [10, 20, 20, 10, 10, 20]
    });

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
      if (err) throw err;
        
      //For each record 
      for(var i=0; i<res.length; i++){
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
      }
      // Log all results of the SELECT statement
      console.log(table.toString());
      connection.end();
    });
  }