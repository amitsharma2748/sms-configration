var mysql = require('mysql');

// const {
//   MYSQL_HOST,
//   MYSQL_USER,
//   MYSQL_PASSWORD,
//   MYSQL_DB,
// } = require('../Configurations/readconfigparams');
  

const pool = mysql.createPool({
  host: '192.168.2.64',
  user: 'root',
  password: 'Rootunlock@22',
  database: 'configurations',
});

module.exports = pool;
