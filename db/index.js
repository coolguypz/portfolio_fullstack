const mysql = require('mysql2');
const config = require('../config/db.json');
const conn = mysql.createConnection(config)
const pool = mysql.createPool(config);

conn.connect((err) =>{
    if(err) console.log("ERROR: ",err);
    else console.log("DATABASE is Connected");
})

module.exports = pool;
