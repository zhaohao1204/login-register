// get the client
const mysql = require('mysql2');
 
// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'kw31',
  password:'961924',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;