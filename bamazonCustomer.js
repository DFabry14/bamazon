var mysql = require("mysql");
var inquirer = require("inquirer");

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

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        inquirer.prompt([
            {
                name: "options",
                message: "Please select product by ID number:",
                type: "input"
            }
        ]).then(function (answers) {
            options = answers.options;
            connection.query("SELECT * FROM products WHERE item_id = ?", answers.options, function (err, data) {
            })
          }).then(function(amount) {
              inquirer.prompt([{
                name: "quantity",
                message: "How many would you like to purchase?",
                type: "input"   
            }])
        // start();
    });
})
}
