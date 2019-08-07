DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR (45),
    price DECIMAL(5,2),
    stock_quantity INT(8),
    product_sales INT(8),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(45),
    overhead_costs DECIMAL(10,4),
    PRIMARY KEY (department_id)
);



