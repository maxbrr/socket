const mysql = require("mysql-await");
const mysqlConfig = require("./mysqlConfig.js");

const connection = mysql.createConnection(mysqlConfig);

module.exports = connection;