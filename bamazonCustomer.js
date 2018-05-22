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
                name: "item_id",
                message: "Please select product by ID number:",
                type: "input"
            },
            {
                name: "stock_quantity",
                message: "How many would you like to purchase?",
                type: "input"
            }
        ]).then(function (answers) {
            connection.query("SELECT * FROM products WHERE item_id = ?", answers.item_id, function (err, data) {
                if (data[0].stock_quantity < parseInt(answers.stock_quantity)) {
                    console.log("Insufficient quantity!")
                } else {
                    console.log("Purchase successful! Total cost: $" + (parseInt(answers.stock_quantity)) * data[0].price);
                }
            })
            start();
        });
    })
}
