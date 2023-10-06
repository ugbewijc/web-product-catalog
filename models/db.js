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

    /**
     * runQuery -: runs sql queries for anything related to database
     * @param {string} sqlQuery, sql statement
     * @param {array} values, parameter for the statement
     */

    const runQuery = async (sql, values=[]) =>{
      return new Promise((resolve, reject) => {
          pool.query(sql, values, (error, results) => {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          });
      });
  };


export default runQuery;