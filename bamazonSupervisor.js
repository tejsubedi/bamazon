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

    // Function to display products available for sale

    function displaydeptSales() {
        var table = new Table({
            head: ['department_id', 'department_Name', 'overhead_costs', 'product_sales', 'total_profit']
            , colWidths: [20, 20, 20, 20, 20]
        });
        var query = "SELECT dept.department_id as department_id,dept.department_name as department_name,dept.overhead_costs as overhead_costs,prod.product_sales as product_sales,(prod.product_sales-dept.overhead_costs) as total_profit from departments as dept inner join products as prod on prod.department_name = dept.department_name group by dept.department_name order by dept.department_id asc;";
        connection.query(query, function (err, res) {

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales, res[i].total_profit]);
            }
            console.log(table.toString());

        });

    }


}