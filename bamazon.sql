DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4k TV", "Electronics", 750, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One X", "Electronics", 500, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1300, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TaylorMade M4 Driver", "Sporting Goods", 400, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trampoline", "Sporting Goods", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Volleyball Net", "Sporting Goods", 250, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 1000, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kitchen Table", "Furniture", 500, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV Stand", "Furniture", 250, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV", "Entertainment", 150, 300);