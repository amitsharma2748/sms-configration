var mysql = require('mysql');


const pool = mysql.createPool({
  host: '192.168.2.64',
  user: 'root',
  password: "Rootunlock@22",
  database: "configurations",
});

module.exports = pool;

