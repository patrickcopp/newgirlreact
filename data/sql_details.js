var mysql      = require('mariadb');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Password123',
  database : 'logs',
  connectionLimit: 15,
  port: 3306
});

module.exports = pool;
