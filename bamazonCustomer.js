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

  //This function provides users option to provide the item and quantity they want to purchase

  function userPrompt(){

    inquirer
    .prompt([
        {
            name: "itemID",
            type: "input",
            message: "Enter the id of the product you want to purchase"
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many quantity would you like to purchase? "
        },
    ]).then(function(answer){
        //based on the users choices, check the product quantity available for sale
        connection.query("SELECT item_id, product_name, price, stcok_quantity FROM products WHERE ?"
        , {item_id: answer.itemID}, function(err, res) {
            if(err) throw err;
            if(answer.Quantity > res[0].stock_quantity){
                console.log("Insufficient quantity !!!");
            } else {
                var curStock = res[0].stock_quantity - answer.Quantity;
                var totalCost = res[0].price * answer.Quantity;
                var product_sales = res[0].product_sales + parseInt(totalCost);
            }
        })
    })
  }