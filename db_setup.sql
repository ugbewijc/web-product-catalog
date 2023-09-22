-- Web Product Catalog MySQL Setup Script
--
--
-- CREATE DATABASE IF NOT EXISTS web_product_catalog;
-- CREATE USER IF NOT EXISTS 'web_product_catalog'@'localhost' IDENTIFIED BY 'webProductCatalog';

-- creates the product table
-- description: id INT, name VARCHAR(256) can’t be null
CREATE TABLE IF NOT EXISTS `categories` (
    `id`   BIGINT AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE (name)
);