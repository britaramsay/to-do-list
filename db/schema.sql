CREATE DATABASE toDoList_db;

USE toDoList_db;

CREATE TABLE list (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    item_name VARCHAR(150),
    done BOOLEAN DEFAULT false
);