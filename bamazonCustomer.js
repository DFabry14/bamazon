var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to SQL ✅

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    };
    start();
});

// Start menu and options ✅

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }

        // Choose product ✅

        inquirer.prompt([
            {
                name: "options",
                message: "Please select product by ID number:",
                type: "input"
            },
            {
                name: "quantity",
                message: "How many would you like to purchase?",
                type: "input"
            }
        ]).then(function (answers) {
            inquirer.prompt([{


                // Confirm/deny and update inventory ❓

            }]).then()
            // start();
        });
    })
}
