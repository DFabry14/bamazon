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

// Start up menu ✅

function start() {
    inquirer.prompt([
        {
            name: "action",
            message: "Hello Manager, please select an option:",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"],
            type: "list"
        }
    ]).then(function (response) {
        switch (response.action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInv();
                break;
            case "Add to Inventory":
                addToInv();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            default:
                break;
        }
    });
}

// View all products ✅

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price + " | Available: " + res[i].stock_quantity);
        }
        start();
    })
}

// View products with less than 5 in inventory ✅

function viewLowInv() {
    var lowInv = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                lowInv.push(res[i]);
            }
        }
        for (var i = 0; i < lowInv.length; i++) {
            console.log("Products with less than 5 available: ID: " + lowInv[i].item_id + " | Product: " + lowInv[i].product_name + " | Department: " + lowInv[i].department_name + " | Price: " + lowInv[i].price + " | Available: " + lowInv[i].stock_quantity);
        }
    })
    start();
}

// Add more to inventory ✅

function addToInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price + " | Available: " + res[i].stock_quantity);
        } inquirer.prompt([
            {
                name: "item_id",
                message: "Which product would you like to update? Please select product by ID number:",
                type: "input"
            },
            {
                name: "stock_quantity",
                message: "Please enter how many you would like to add:",
                type: "input"
            }

        ]).then(function (response) {
            connection.query("SELECT * FROM products WHERE item_id = ?", response.item_id, function (err, data) {
                if (err) {
                    throw err;
                }
                // console.log("this is the item to be updated =", data)
                var newInv = data[0].stock_quantity + +response.stock_quantity;
                connection.query(`UPDATE products SET stock_quantity = ${newInv} WHERE item_id = ${response.item_id}`, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    console.log("Product inventory has been updated!");
                })
                start();
            })
        })
    })
}

// Adding a new product to database ✅

function addNewProduct() {
    inquirer.prompt(
        [{
            name: "product_name",
            message: "Please enter product name:",
        },
        {
            name: "department_name",
            message: "Please enter which department the product will go in:",
        },
        {
            name: "price",
            message: "Please enter product price",
        },
        {
            name: "stock_quantity",
            message: "Please enter the number available:"
        }
        ]).then(function (answers) {
            connection.query("INSERT INTO products SET ?", answers, function (err, data) {
                if (err) {
                    throw err;
                }
                console.log("Product added!");
                start();
            })
        });
}
