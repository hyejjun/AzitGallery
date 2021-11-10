const mysql = require('mysql');

let pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'auction_test',
    connectionLimit:30
});



module.exports = pool;