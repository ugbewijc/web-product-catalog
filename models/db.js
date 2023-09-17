import express from 'express'
import mysql from 'mysql'


// create connection
const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'productCatalog',
  host: 'localhost',
});

// connect
connection.connect();