const util = require("util");
const mysql = require("mysql");
// const { resolve } = require("node:path");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "Keita4040",
  database: "employees"
});

connection.connect()

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);


// connection.query = new Promise((resolve, reject)=>{
//     resolve(connection.query)
// })

module.exports = connection;
