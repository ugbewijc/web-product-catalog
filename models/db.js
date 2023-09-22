import mysql from 'mysql'


// create connection
/**const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'productCatalog',
  host: 'localhost',
});

// connect
connection.connect();
*/

//create pool
const pool  = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PWD,
  database : process.env.DB_NAME
});

export default pool;