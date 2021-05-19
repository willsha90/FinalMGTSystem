const mysql = require("mysql");

//needed for utility module
const util = require("util");

// const { resolve } = require("node:path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Keita4040",
  database: "employees"
});

connection.connect()

connection.query = util.promisify(connection.query);


// connection.query = new Promise((resolve, reject)=>{
//     resolve(connection.query)
// })


module.exports = connection;
